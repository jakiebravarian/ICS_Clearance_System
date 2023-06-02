import mongoose from "mongoose";
import { UserSchema } from "./models/user.js";

const User = mongoose.model("user", UserSchema);

const getPendingStudent = async (req,res) => {

}

const assignAdviser = async (req,res) => {

}

const approveApplication = async (req,res) => {

}

const rejectApplication = async (req,res) => {

}

const sortStudentByStudentNum = async (req,res) => {

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

export {sortStudentByName}