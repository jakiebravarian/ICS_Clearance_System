import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { UserSchema } from "./models/user.js";
import jwt from "jsonwebtoken";

const User = mongoose.model("User", UserSchema);

const createApproverAccount = async (req, res) => {
  const emailChecker = await User.findOne({
    upMail: req.body.upMail.toLowerCase(),
  });

  //function for validationg upmail
  function matchRegex(email) {
    return /^([a-z0-9]+)@up\.edu\.ph$/i.test(email);
  }

  //check if upmail is already existing (findone)
  if (emailChecker) {
    return res.send({ emailExist: true });
  } else {
    //check if follows regex
    if (!matchRegex(req.body.upMail.toLowerCase())) {
      res.send({ success: false });
    } else {
      const {
        firstName,
        middleName,
        lastName,
        upMail,
        password,
        studentNumber,
        degreeProgram,
        college,
        userType,
        adviser,
        application,
      } = req.body;
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
          application: application,
        })
          .then(() => {
            res.send({ success: true });
          })
          .catch((err) => {
            if (err) {
              res.send({ success: false });
              console.log(err);
            }
          });
      });
    }
  }
};

const searchApproverByName = async (req, res) => {
  //subject to change
  // https://mongoosejs.com/docs/tutorials/virtuals.html
  const searchName = await User.findMany({
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
  });

  try {
    if (!searchName) {
      res.send("not found");
    } else {
      res.send(searchName);
    }
  } catch (err) {
    if (err) {
      res.send({ success: false });
    }
  }
};

const filterNameAscending = async (req, res) => {};

const filterNameDescending = async (req, res) => {};

export { createApproverAccount };
