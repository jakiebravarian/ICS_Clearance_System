import mongoose from "mongoose";
import bcrypt from "bcrypt";
import AppSchema from "./application.";

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  middleName: { type: String, required: true },
  lastName: { type: String, required: true },
  upMail: { type: String, required: true },
  password: { type: String, required: true },
  studentNumber: { type: String, required: false },
  useType: { type: String, required: true },
  adviser: { type: String, required: false },
  application: [{ type: SchemaType.ObjectId, ref: application }],
});

const application = mongoose.model("application", AppSchema);
const user = mongoose.model("user", UserSchema);
