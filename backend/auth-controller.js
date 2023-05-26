import mongoose from "mongoose";
import bcrypt from "bcrypt";
import {UserSchema} from "./models/user.js";
import jwt from 'jsonwebtoken';

const User = mongoose.model("User", UserSchema);

const signUp = async (req, res) => {

    const {  firstName, middleName, lastName, upMail, password, studentNumber, userType, adviser, application } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        User.create({
            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
            upMail: upMail,
            password: hash,
            studentNumber: studentNumber,
            userType: userType,
            adviser: adviser,
            application: application
        })
            .then(() => {
                res.send({success : true});
            })
            .catch((err) => {
                if (err){
                    res.send({success : false})
                    console.log(err);
                }
            })
    })
}

const login = async (req,res) => {
    //get email and password from the body
    const email = req.body.upMail.trim();
    const password = req.body.password;

    // Check if email exists
    const user = await User.findOne({upMail: email});

     //  Scenario 1: FAIL - User doesn't exist
    if(!user){
        return res.send({ success: false })  
    }

    //check if password is correct
    const dbPassword = user.password;
    //compare using bcrypt, get pass from database and from input
    bcrypt.compare(password, dbPassword).then((match) => {
         // Scenario 2: FAIL - Wrong password
        if(!match) 
        {
            return res.send({ success: false })  
        }
        else
        {
        // Scenario 3: SUCCESS
            const tokenPayload = {
                _id: user._id
            }
        
            const token = jwt.sign(tokenPayload, "THIS_IS_A_SECRET_STRING");

            // return the token to the client
            return res.send({ success: true, token, username: user.name });
        
        }
    })

}

const checkifloggedin = async (res,req) => {
    
}
export {signUp, login, checkifloggedin};
