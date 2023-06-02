import mongoose from "mongoose";
import { UserSchema } from "./models/user.js";
import { AppSchema } from "./models/application.js";

const User = mongoose.model("user", UserSchema);
const Application = mongoose.model("application", AppSchema);

const getPendingStudent = async (req,res) => {
    try
    {
        const pendingApplication = await Application.find({status: "Pending"});
        const getPendingStudent = await User.find({application: {$elemMatch: pendingApplication._id}})

        res.send(getPendingStudent);
    }
    catch(err){
        res.status(500).send('An error occurred'); 
    }
}

const assignAdviser = async (req,res) => {
    try{

        if(req.body.middleName == "") //if no middle name
        {
            const assignedAdviser = await User.findOne({firstName: req.body.firstName, lastName: req.body.lastName});
            
            if(!assignedAdviser || assignedAdviser.title == "Clearance Office")
            {
                res.send({success: false});
            }
            else
            {
                const student = await User.findOne({studentNumber: req.body.studentNumber});
    
                student.adviser = assignedAdviser._id;
    
                student.save();
    
                res.send({success: true});
            }
        }
        else //if theres middle name
        {
            const assignedAdviser = await User.findOne({firstName: req.body.firstName, middleName: req.body.middleName, lastName: req.body.lastName});
            
            if(!assignedAdviser || assignedAdviser.title == "Clearance Office"){
                res.send({success: false});
            }
            else
            {
                const student = await User.findOne({studentNumber: req.body.studentNumber});
    
                student.adviser = assignedAdviser._id;
    
                student.save();
    
                res.send({success: true});
            }

        }
        
        
        

    }
    catch(err)
    {
        res.status(500).send('An error occurred'); 
    }
}

const sortStudentByStudentNum = async (req,res) => {
    try{
        const sortByStudNum =  await User.find({}).sort({studentNumber: "desc"});
        res.send(sortByStudNum);
    }catch(err){
        res.status(500).send('An error occurred');
    }
}

const sortStudentByName = async (req,res) => {

    function returnResult(student){
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
        const searchName = req.body.search;
        
        if(searchName == ""){
            const sortStudentName = await User.find({userType: "Student"}).sort({firstName: 'desc', lastName:'desc'})
            returnResult(sortStudentName)
        }
        else
        {
            const sortStudentName = await User.find({userType: "Student", $text: { $search: searchName }}).sort({firstName: 'desc', lastName:'desc'})
            if(!sortStudentName){
                res.send({found: false});
            }
            else{
                returnResult(sortStudentName)
            }
        } 
      }catch(err){
        res.status(500).send('An error occurred');
      }
}

export {sortStudentByName, getPendingStudent, assignAdviser, sortStudentByStudentNum}