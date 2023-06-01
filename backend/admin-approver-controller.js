import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { UserSchema } from "./models/user.js";
import jwt from "jsonwebtoken";

const User = mongoose.model("user", UserSchema);


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

    try {
      const searchName = req.body.search;
  
      // Assuming you have a User model imported and defined correctly
  
      // Create the text index (if it doesn't exist yet)
      await User.collection.createIndex({ firstName: 'text', middleName: 'text', lastName: 'text' });
  
      // Perform the text search
      const searchedApprover = await User.find({ $text: { $search: searchName } });
  
      res.send(searchedApprover);
    } catch (error) {
      console.error('An error occurred:', error);
      res.status(500).send('An error occurred');
    }

};

const filterNameAscending = async (req, res) => {
  try{
    const sortAppNameAsc = await User.find({userType: "Approver"}).sort({firstName: 'asc', lastName:'asc'})
    
    if(!sortAppNameAsc){
      res.send({found: false});
    }
    else{
      res.send(sortAppNameAsc);
    }
  }catch(err){
    res.status(500).send('An error occurred');
  }
};

const filterNameDescending = async (req, res) => {
  try{
    const sortAppNameDesc = await User.find({userType: "Approver"}).sort({firstName: 'desc', lastName:'desc'})
  
    if(!sortAppNameDesc){
      res.send({found: false});
    }
    else{
      res.send(sortAppNameDesc);
    }
  }catch(err){
    res.status(500).send('An error occurred');
  }
};

const deleteApprover = async (req, res) => {
  try{
    const { upMail } = req.body

    const result = await User.deleteOne({ upMail})

    if (result.deletedCount == 1) {
      res.send({ success: true })
    } else { 
      res.send({ success: false })
    }
  }catch(err){
    res.status(500).send('An error occurred');
  }
	
}

export { createApproverAccount, searchApproverByName, filterNameAscending, filterNameDescending};
