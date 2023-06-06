import mongoose from 'mongoose';
import { User, UserSchema } from './models/user.js';
import { Application, AppSchema } from './models/application.js';
import bcrypt from "bcrypt";

export const getAllPendingApplications = async (req, res) => {
  try {
    const upMail = req.query.upMail;
    const approver = await User.findOne({ upMail: upMail });
    // console.log(approver._id);
    let currentPendingApplications = [];
    if (approver.title === "Adviser") {
      const applicationsQuery = Application.find({ status: "Open" }).populate("student");

      applicationsQuery
        .then((applications) => {

          // Filter applications based on adviser
          applications.forEach(function (application) {
            if (application.student.adviser === approver._id) {
              currentPendingApplications = currentPendingApplications.concat(application);
            }
          });

          // Send the response
          res.send(currentPendingApplications);
        })
        .catch((error) => {
          // Handle the error
          console.error(error);
          // Send an error response
          res.status(500).send("Internal Server Error");
        });

    } else {
      const applicationsQuery = Application.find({ status: "Open" }).populate("student");
      applicationsQuery
        .then((applications) => {
          // Handle the applications array
          console.log(applications);
          // Push the applications to the array
          currentPendingApplications.push(...applications);
          // Send the response
          res.send(currentPendingApplications);
        })
        .catch((error) => {
          // Handle the error
          console.error(error);
          // Send an error response
          res.status(500).send('Internal Server Error');
        });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const searchStudentByName = async (req, res) => {
  try {
    const searchName = req.body.search;

    // Assuming you have a User model imported and defined correctly

    // Create the text index (if it doesn't exist yet)
    await User.collection.createIndex({ firstName: 'text', middleName: 'text', lastName: 'text' });

    // Perform the text search
    const searchedStudent = await User.find({ $text: { $search: searchName } });

    res.send(searchedStudent);
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).send('An error occurred');
  }
};

export const searchStudentByStudentNumber = async (req, res) => {
  try {
    const searchName = req.body.search;

    // Assuming you have a User model imported and defined correctly

    // Create the text index (if it doesn't exist yet)
    const searchedStudent = await User.findOne({ studentNumber: searchName });
    // Perform the text search

    res.send(searchedStudent);
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).send('An error occurred');
  }
};

export const filterApplicationsByDate = async (req, res) => {
  try {
    const filterDate = req.body.date;
    const applications = req.body.applications
    // Assuming you have a User model imported and defined correctly
    // Create the text index (if it doesn't exist yet)
    const filteredApplicationsByDate = [];
    applications.forEach(application => {
      if (application.studentSubmission.dateSubmission == filterDate) {
        filteredApplicationsByDate = filteredApplicationsByDate.concat(applications);
      }
    });
    // Perform the text search

    res.send(filteredApplicationsByDate);
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).send('An error occurred');
  }
};

export const filterApplicationsByAdviser = async (req, res) => {
  try {
    const adviserId = req.body.adviserId;
    const applications = req.body.applications;
    // Assuming you have a User model imported and defined correctly
    // Create the text index (if it doesn't exist yet)
    const students = await User.find({ adviser: adviserId });
    const filteredApplicationsByAdviser = [];
    students.forEach(student => {
      filteredApplicationsByAdviser = filteredApplicationsByAdviser.concat(students.application);
    });

    // Perform the text search

    res.send(filteredApplicationsByAdviser);
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).send('An error occurred');
  }
};

export const filterApplicationsByStep = async (req, res) => {
  try {
    const filterStep = req.body.step;
    const applications = req.body.applications;
    // Assuming you have a User model imported and defined correctly
    // Create the text index (if it doesn't exist yet)
    const students = await User.find({ adviser: adviserId });
    const filteredApplicationsByStep = [];
    applications.forEach(application => {
      if (application.step == filterStep) {
        filteredApplicationsByStep.push(application);
      }
    });

    // Perform the text search

    res.send(filteredApplicationsByStep);
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).send('An error occurred');
  }
};

export const sortApplicationsByDate = async (req, res) => {
  try {
    const { sortOrder, currentApplications } = req.query;

    const sortOption = sortOrder === 'asc' ? 1 : -1;

    let query = Application.find();

    if (currentApplications) {
      const currentApplicationIds = currentApplications.split(',');
      query = query.where('_id').in(currentApplicationIds);
    }

    const applications = await query.sort({ date: sortOption });

    res.send(applications);
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).send('An error occurred');
  }
};

export const sortApplicationsByName = async (req, res) => {
  try {
    const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;

    const applications = await Application.find()
      .sort({ 'student.lastName': sortOrder, 'student.firstName': sortOrder })
      .populate('student', 'firstName lastName');

    res.send(applications);
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).send('An error occurred');
  }
};

export const getCurrentStudentByApplicationId = async (req, res) => {
  try {
    const applicationId = req.query.applicationId; // Get the user email from the query parameter
    const student = await Student.findOne({ applicationId: applicationId }).populate('application'); // Query the student with the specified email
    console.log(student);
    res.send(student);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const getSubmissionByStudentAtAnyStep = async (req, res) => {
  try {
    const studentId = req.query.studentId;

    const user = await User.findById(studentId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    const applications = await Application.find({
      _id: { $in: user.application },
      'studentSubmission.remarkSubmission': { $exists: true },
    });

    res.send(applications);
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).send('An error occurred');
  }
};

export const approveApplicationAtCurrentStep = async (req, res) => {
  try {
    const { appId } = req.body;

    // Find the application by ID
    const application = await Application.findById(appId);
    if (!application) {
      return res.status(404).send('Application not found');
    }

    // Update the application status and increment the step
    application.step += 1;
    if (application.step == 4) {
      application.status = "Cleared";
    }

    // Save the updated application
    await application.save();

    res.send('Application approved at current step successfully');
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).send('An error occurred');
  }
};


export const returnAppAtCurrentStep = async (req, res) => {
  try {
    const { appId } = req.body;

    // Find the application by ID
    const application = await Application.findById(appId);
    if (!application) {
      return res.status(404).send('Application not found');
    }

    res.send('Application returned to previous step successfully');
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).send('An error occurred');
  }
};

export const createApprover = async (req, res) => {

  const emailChecker = await User.findOne({ upMail: req.body.upMail.toLowerCase() });

  //function for validationg upmail
  function matchRegex(email) {
    return /^([a-z0-9]+)@up\.edu\.ph$/i.test(email)
  }

  //check if upmail is already existing (findone)
  if (emailChecker) {
    return res.send({ emailExist: true });
  }
  else {

    //check if follows regex
    if (!matchRegex(req.body.upMail.toLowerCase())) {
      console.log(req.body);
      res.send({ success: false })
    }
    else {
      const { firstName, middleName, lastName, upMail, password, studentNumber, degreeProgram, college, userType, title, adviser, application } = req.body;
      console.log(req.body);
      bcrypt.hash(password, 10).then((hash) => {
        User.create({
          firstName: firstName,
          middleName: middleName,
          lastName: lastName,
          upMail: upMail,
          password: hash,
          userType: userType,
          title: title,
        })
          .then(() => {
            res.send({ success: true });
          })
          .catch((err) => {
            if (err) {
              res.send({ success: false })
              console.log(err);
            }
          })
      })
    }

  }
}