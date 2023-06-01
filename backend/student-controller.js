import mongoose from 'mongoose';
import { UserSchema } from './models/user.js';

const Student = mongoose.model("users",UserSchema);

const getAllStudents = async (req, res) => {
    const userType = "student"; // Get the user type from the query parameter
    const students = await Student.find({ userType: userType }); // Query the students with the specified user type
    console.log(students);
    res.send(students);
};

const getCurrentStudent = async (req, res) => {
    const upMail = req.query.upMail; // Get the user type from the query parameter
    const students = await Student.findOne({ upMail: upMail }); // Query the students with the specified user type
    console.log(students);
    res.send(students);
};

export {getAllStudents,getCurrentStudent};