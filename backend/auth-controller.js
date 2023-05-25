import mongoose from "mongoose";
import bcrypt from "bcrypt";
import {UserSchema} from "./models/user.js";

const User = mongoose.model("User", UserSchema);

const signUp = async (req, res) => {
    //add adviser and application
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
    const name = req.body.firstName;
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
            return res.send({ success: true })
        }
    })

}

const checkifloggedin = async (res,req) => {

}
export {signUp, login, checkifloggedin};
