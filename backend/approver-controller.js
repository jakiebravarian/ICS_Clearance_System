import mongoose from 'mongoose';
import { User, UserSchema } from './models/user.js';
import { AppSchema } from './models/application.js';
const User = mongoose.model("users",UserSchema);
const Application = mongoose.model("Application",AppSchema);

export const getAllPendingApplications = async (req, res) => {
    try {
        const upMail = req.upMail;
        const approver = await User.findOne({ upMail: upMail });

        let currentPendingApplications = [];

        if (approver.title === "Adviser") {
            const users = await User.find({ adviser: approver._id });
            for (const user of users) {
                const applicationIds = user.application.map(app => app._id);
            
                const applications = await Application.find({
                status: "Pending",
                _id: { $in: applicationIds }
                }).populate("remarks.commenter", "firstName lastName");
                currentPendingApplications = currentPendingApplications.concat(applications);
            }
            res.send(currentPendingApplications);
        }else{
            const application = Application.find({status:"Pending"});
            currentPendingApplications.push(application);
            res.send(currentPendingApplications);
        }
    }catch (error) {
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
        const searchedStudent = await User.findOne({studentNumber: searchName});
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
            if(application.studentSubmission.dateSubmission == filterDate){
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
        const students = await User.find({adviser: adviserId});
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
        const students = await User.find({adviser: adviserId});
        const filteredApplicationsByStep = [];
        applications.forEach(application => {
            if(application.step == filterStep){
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

    import Application from 'path/to/application/model';

    export const approveApplicationAtCurrentStep = async (req, res) => {
    try {
        const { applicationId } = req.body;

        // Find the application by ID
        const application = await Application.findById(applicationId);
        if (!application) {
        return res.status(404).send('Application not found');
        }

        // Update the application status and increment the step
        application.step += 1;
        if(application.step==4){
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
          const { applicationId } = req.body;
      
          // Find the application by ID
          const application = await Application.findById(applicationId);
          if (!application) {
            return res.status(404).send('Application not found');
          }
      
          res.send('Application returned to previous step successfully');
        } catch (error) {
          console.error('An error occurred:', error);
          res.status(500).send('An error occurred');
        }
      };
   