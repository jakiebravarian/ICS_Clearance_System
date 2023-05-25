import mongoose from "mongoose";
//import AppSchema from "./application.js";

const {Schema} = mongoose;

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  middleName: { type: String, required: true },
  lastName: { type: String, required: true },
  upMail: { type: String, required: true },
  password: { type: String, required: true },
  studentNumber: { type: String, required: false },
  userType: { type: String, required: true },
  adviser: { type: Schema.Types.ObjectId, ref: 'user', required: false },
  //application: [{ type: Schema.Types.ObjectId, ref: 'application' }],
});

//register model name
mongoose.model("user", UserSchema);

//const application = mongoose.model("application", AppSchema);
const user = mongoose.model("user", UserSchema);

export default UserSchema;
