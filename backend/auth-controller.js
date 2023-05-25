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

export {signUp};
