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
        
        const assignedAdviser = await User.findOne({_id: req.body.adviserId});
            
        if(!assignedAdviser || assignedAdviser.title == "Clearance Office")
        {
            res.send({success: false});
        }
        else
        {
            const student = await User.findOne({studentNumber: req.body.studentNumber});

            student.adviser = assignedAdviser._id;
            student.isVerified = "Verified";

            student.save();

            res.send({success: true});
        }

    }
    catch(err)
    {
        // res.status(500).send('An error occurred'); 
        res.send(err);
    }
}

const sortStudentByStudentNum = async (req,res) => {
    try{
        const sortByStudNum =  await User.find({userType: "Student", adviser: null,  isVerified: "Pending"}).sort({studentNumber: "desc"});
        res.send(sortByStudNum);
        // console.log("sn" + sortByStudNum);
    }catch(err){
        // res.status(500).send('An error occurred');
        res.send(err);
    }
}

const sortStudentByName = async (req,res) => {


    try{
        const sortbyName =  await User.find({userType: "Student", adviser: null,  isVerified: "Pending"}).sort({lastName: "asc"});
        // res.send(sortbyName);
        // console.log(sortbyName);
        res.send(sortbyName)
      }catch(err){
       // res.status(500).send('An error occurred');
       res.send(err);
      }
}

const getStudent = async (req, res) => {
    try{
        const student =  await User.find({userType: "Student", adviser: null, isVerified: "Pending"});
        res.send(student)
      }catch(err){
       // res.status(500).send('An error occurred');
       res.send(err);
      }
}

const rejectStudent = async (req,res) =>{
    try{
        const currStud = req.body.student
        console.log(currStud);
        const student =  await User.findOne({upMail: currStud.upMail});
        student.isVerified = "Rejected";
        student.save();
        res.send(student);
      }catch(err){
       // res.status(500).send('An error occurred');
       res.send(err);
      }
}

export {sortStudentByName, getPendingStudent, assignAdviser, sortStudentByStudentNum, getStudent,rejectStudent}