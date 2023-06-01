import mongoose from 'mongoose';
import { UserSchema } from './models/user.js';

const Student = mongoose.model("users",UserSchema);

export const getAllStudents = async (req, res) => {
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
  
  export const getCurrentStudent = async (req, res) => {
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

  export const submitApplication = async (req,res) =>{
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

  export const viewStudentClearanceStatus = async (req, res) => {
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

  export const updateStep = async (req, res) => {
    try {
      const { applicationId, step } = req.body; // Get the applicationId and new step value from the request body
  
      // Find the application by applicationId
      const application = await Application.findById(applicationId);
      if (!application) {
        return res.status(404).send('Application not found');
      }
  
      // Update the step of the application
      application.step = step;
      await application.save();
  
      res.send('Step updated successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };
  
  export const updateStudentSubmission = async (req, res) => {
    try {
      const { applicationId, studentSubmission } = req.body; // Get the applicationId and new studentSubmission value from the request body
  
      // Find the application by applicationId
      const application = await Application.findById(applicationId);
      if (!application) {
        return res.status(404).send('Application not found');
      }
  
      // Update the studentSubmission of the application
      application.studentSubmission = studentSubmission;
      await application.save();
  
      res.send('Student submission updated successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };
  
  export const closeApplication = async (req, res) => {
    try {
      const { applicationId } = req.body; // Get the applicationId from the request body
  
      // Find the application by applicationId
      const application = await Application.findById(applicationId);
      if (!application) {
        return res.status(404).send('Application not found');
      }
  
      // Update the status of the application to "closed"
      application.status = 'closed';
      await application.save();
  
      res.send('Application closed successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };
  
  

