import mongoose from 'mongoose';
import { UserSchema } from './models/user.js';
import { AppSchema } from './models/application.js';
import jwt from 'jsonwebtoken';

const Student = mongoose.model("users", UserSchema);
const Application = mongoose.model("Application", AppSchema);


export const getAllStudents = async (req, res) => {
  try {
    const userType = req.query.userType; // Get the user type from the query parameter
    const students = await Student.find({ userType: userType }); // Query the students with the specified user type
    res.send(students);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const getCurrentStudent = async (req, res) => {
  try {
    const upMail = req.query.upMail; // Get the user email from the query parameter
    const student = await Student.findOne({ upMail: upMail }).populate('application'); // Query the student with the specified email
    res.send(student);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const submitApplication = async (req, res) => {
  try {
    console.log("Submit application request received"); // Check if the function is being called
    console.log("Request body:", req.body); // Log the request body

    const { upMail, status, step, remarks, studentSubmission } = req.body; // Get the necessary data from the request body

    console.log("Received data:", { upMail, status, step, remarks, studentSubmission }); // Log the received data

    // Find the user and push the newly created application to their application array
    const user = await Student.findOne({ upMail: upMail });
    if (!user) {
      return res.status(404).send("User not found");
    }


    const application = new Application({
      student: user._id,
      status: status,
      step: step,
      remarks: remarks,
      studentSubmission: studentSubmission,
    });
    console.log(application);
    // Save the application to the database
    await application.save();

    console.log("Application saved:", application); // Log the saved application object

    user.application = user.application || []; // Set user.application to an empty array if it is null

    user.application.push(application);
    await user.save();
    console.log("User application updated:", user); // Log the updated user object

    res.send(application);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};


export const viewStudentClearanceStatus = async (req, res) => {
  try {
    const upMail = req.query.upMail; // Get the user email from the query parameter
    const student = await Student.findOne({ upMail: upMail }).populate('application');

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });

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
    const app = req.body.currentApplication; // Get the applicationId and new studentSubmission value from the request body
    // Update the studentSubmission of the application
    console.log(app._id);
    const application = await Application.findById(app._id);
    if (!application) {
      return res.status(404).send('Application not found');
    }
    application.status = "Open";
    application.studentSubmission = app.updatedStudentSubmission;
    application.save();

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
    application.status = 'Closed';
    await application.save();

    res.send('Application closed successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

export const getCurrentApplication = async (req, res) => {
  try {
    const applicationId = req.query.applicationId; // Get the applicationId from the request parameters
    // Find the application by applicationId
    console.log(req.query);
    const application = await Application.findById(applicationId).populate({ path: "student", populate: "adviser" })
    .populate({ path: "remarks.commenter", model: "User" });;
    console.log(application);
    if (!application) {
      return res.status(404).send('Application not found');
    }

    res.send(application);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

export const getCurrentApplications = async (req, res) => {
  try {
    const upMail = req.query.upMail; // Get the user email from the query parameter
    const student = await Student.findOne({ upMail: upMail }).populate('application'); // Query the student with the specified email
    res.send(student.application);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};


