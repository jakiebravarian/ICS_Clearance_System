import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { UserSchema } from "./models/user.js";
import jwt from "jsonwebtoken";

const User = mongoose.model("user", UserSchema);

const approverLogin = async (req, res) =>{
   //get email and password from the body
   const email = req.body.upMail.trim();
   const password = req.body.password;

   // Check if email exists, and if it is an approver
   const user = await User.findOne({upMail: email, userType: "Approver"});

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

const searchApproverByName = async (req, res) => {

    try {
      const searchName = req.body.search;
  
      // Assuming you have a User model imported and defined correctly
  
      // Create the text index (if it doesn't exist yet)
      await User.collection.createIndex({ firstName: 'text', middleName: 'text', lastName: 'text' });
  
      // Perform the text search
      const searchedApprover = await User.find({userType: "Approver" ,$text: { $search: searchName } });
  
      res.send(searchedApprover);
    } catch (error) {
      console.error('An error occurred:', error);
      res.status(500).send('An error occurred');
    }

};

const filterNameAscending = async (req, res) => {
    function returnResult(sortAppNameAsc){
      if(!sortAppNameAsc)
      {
          res.send({found: false});
      }
      else
      {
          res.send(sortAppNameAsc);
      }
  };

  try{
      //check first if search name is not empty
      const searchName = req.query.search;
      console.log(searchName)
      console.log(req.query)
      
      if(searchName == ""){
          const sortAppNameAsc = await User.find({userType: "Approver"}).sort({firstName: 'asc', lastName:'asc'})
          returnResult(sortAppNameAsc)
      }
      else
      {
          const sortAppNameAsc = await User.find({userType: "Approver", $text: { $search: searchName }}).sort({firstName: 'asc', lastName:'asc'})
          if(!sortAppNameAsc){
              res.send({found: false});
          }
          else{
              returnResult(sortAppNameAsc)
          }
      } 
    }catch(err){
      res.status(500).send('An error occurred');
    }
};

const filterNameDescending = async (req, res) => {

  function returnResult(sortAppNameDesc){
    if(!sortAppNameDesc)
    {
        res.send({found: false});
    }
    else
    {
        res.send(sortAppNameDesc);
    }
};

try{
    //check first if search name is not empty
    const searchName = req.query.search;
    console.log(searchName)
    console.log(req.query)

    if(searchName == ""){
        const sortAppNameDesc = await User.find({userType: "Approver"}).sort({firstName: 'desc', lastName:'desc'})
        returnResult(sortAppNameDesc)
    }
    else
    {
        const sortAppNameDesc = await User.find({userType: "Approver", $text: { $search: searchName }}).sort({firstName: 'desc', lastName:'desc'})
        if(!sortAppNameDesc){
            res.send({found: false});
        }
        else{
            returnResult(sortAppNameDesc)
        }
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

const editApprover = async (req,res) => {
  function matchRegex(email){
    return /^([a-z0-9]+)@up\.edu\.ph$/i.test(email)
}
  try{
    const editApp = await User.findOne({upMail: req.body.upMail});
    console.log(req.body);
  
    //check if new email is a upmail
    if(!matchRegex(req.body.newUpMail)){
      res.send({success: false});
    }
    else{
      editApp.firstName = req.body.firstName;
      editApp.middleName = req.body.middleName;
      editApp.lastName = req.body.lastName;
      editApp.upMail = req.body.newUpMail;
      editApp.password = req.body.password;
  
      await editApp.save();
      res.send({success: true});
    }

  }catch(err){
    res.status(500).send('An error occurred');
  }
}

const getApprover = async (req, res) => {
  try{
    const approver =  await User.find({userType: "Approver"});
    res.send(approver)
  }catch(err){
   // res.status(500).send('An error occurred');
   res.send(err);
  }
}

export {searchApproverByName, filterNameAscending, filterNameDescending, deleteApprover, editApprover, approverLogin, getApprover};
