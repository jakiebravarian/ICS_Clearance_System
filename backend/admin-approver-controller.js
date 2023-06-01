import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { UserSchema } from "./models/user.js";
import jwt from "jsonwebtoken";


//create virtual schema for user
UserSchema.virtual('fullName').get(function()
  {return `${this.firstName} ${this.lastName}`;}).set(function(v){
    const firstName = v.substring(0, v.indexOf(' '));
    const lastName = v.substring(v.indexOf(' ') + 1);
    this.set({firstName, lastName});
  });

const User = mongoose.model("user", UserSchema);

const doc = new User();


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
    // var user = mongoose.collection('user')
    const searchName = req.body.search;
    
    db.users.createIndex({ "firstName": "text", "middleName": "text", "lastName": "text" });
    

    const searchedApprover = await User.find({ $text: { $search: searchName } });
    // const searchedApprover = db.collection.find({
    //   $or: [
    //     { firstname: { $regex: searchName, $options: 'i' } }, // Case-insensitive match on firstname
    //     { lastname: { $regex: searchName, $options: 'i' } }   // Case-insensitive match on lastname
    //   ]
    // })

    res.send(searchedApprover);
};

const filterNameAscending = async (req, res) => {
    const sortAppNameAsc = await User.find({userType: "Approver"}).sort({firstName: 'asc', lastName:'asc'})
    
    if(!sortAppNameAsc){
      res.send({found: false});
    }
    else{
      res.send(sortAppNameAsc);
    }
};

const filterNameDescending = async (req, res) => {
  const sortAppNameDesc = await User.find({userType: "Approver"}).sort({firstName: 'desc', lastName:'desc'})
  
  if(!sortAppNameDesc){
    res.send({found: false});
  }
  else{
    res.send(sortAppNameDesc);
  }
};

const deleteApprover = async (req, res) => {
	const { upMail } = req.body

	const result = await User.deleteOne({ upMail})

	if (result.deletedCount == 1) {
		res.send({ success: true })
	} else { 
		res.send({ success: false })
	}
	
}

export { createApproverAccount, searchApproverByName, filterNameAscending, filterNameDescending};
