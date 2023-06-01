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

  const submitApplication = async (req,res) =>{
    try {
        const { userId, status, step, remarks, studentSubmission } = req.body; // Get the necessary data from the request body
    
        const application = new Application({
          status,
          step,
          remarks,
          studentSubmission,
        });
    
        // Save the application to the database
        await application.save();
    
        // Find the user and push the newly created application to their application array
        const user = await User.findById(userId);
        user.application.push(application);
        await user.save();
    
        res.send(application);
      } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      }
  }

  const viewStudentClearanceStatus = async (req, res) => {
    try {
      const upMail = req.query.upMail; // Get the user email from the query parameter
      const student = await Student.findOne({ upMail: upMail }).populate('application', 'status');
  
      if (!student) {
        return res.status(404).send('Student not found');
      }
  
      res.send(student.application);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };
  
  

export {getAllStudents,getCurrentStudent};