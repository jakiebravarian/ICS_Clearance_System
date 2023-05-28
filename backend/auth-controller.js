import mongoose from "mongoose";
import bcrypt from "bcrypt";
import {UserSchema} from "./models/user.js";
import jwt from 'jsonwebtoken';

const User = mongoose.model("User", UserSchema);

const signUp = async (req, res) => {
    
    const emailChecker =  await User.findOne({upMail: req.body.upMail.toLowerCase()});

    //function for validationg upmail
    function matchRegex(email){
        return /^([a-z0-9]+)@up\.edu\.ph$/i.test(email)
    }

    //check if upmail is already existing (findone)
    if(emailChecker)
    {
        return res.send({emailExist: true}) ;
    }
    else
    {
    
        //check if follows regex
        if(!matchRegex(req.body.upMail.toLowerCase()))
        {
            res.send({success : false})
        }
        else
        {
            const {  firstName, middleName, lastName, upMail, password, studentNumber,degreeProgram, college, userType, adviser, application } = req.body;
            bcrypt.hash(password, 10).then((hash) => {
                User.create({
                    firstName: firstName,
                    middleName: middleName,
                    lastName: lastName,
                    upMail: upMail,
                    password: hash,
                    studentNumber: studentNumber,
                    college: college,
                    degreeProgram: degreeProgram,
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

    }
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

const checkifloggedin = async (req, res) => {
    if (!req.cookies || !req.cookies.authToken) {
        // FAIL Scenario 1 - No cookies / no authToken cookie sent
        return res.send({ isLoggedIn3: false });
      }
    
      try {
        // try to verify the token
        const tokenPayload = jwt.verify(req.cookies.authToken, 'THIS_IS_A_SECRET_STRING');
    
        // check if the _id in the payload is an existing user id
        const user = await User.findById(tokenPayload._id)
    
        if (user) {
          // SUCCESS Scenario - User is found
          return res.send({ isLoggedIn: true })
        } else {
          // FAIL Scenario 2 - Token is valid but user id not found
          return res.send({ isLoggedIn1: false })
        }
      } catch {
        // FAIL Scenario 3 - Error in validating token / Token is not valid
        return res.send({ isLoggedIn2: false });
      }
}
export {signUp, login, checkifloggedin};
