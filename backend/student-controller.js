import mongoose from 'mongoose';
import { UserSchema } from './models/user.js';

const Student = mongoose.model("users",UserSchema);

const getAllStudents = async (req, res) => {
    try {
      const userType = req.query.userType; // Get the user type from the query parameter
      const students = await Student.find({ userType: userType }); // Query the students with the specified user type
      console.log(students);
      res.send(students);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  };
  
  const getCurrentStudent = async (req, res) => {
    try {
      const upMail = req.query.upMail; // Get the user email from the query parameter
      const student = await Student.findOne({ upMail: upMail }); // Query the student with the specified email
      console.log(student);
      res.send(student);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  };
  

export {getAllStudents,getCurrentStudent};