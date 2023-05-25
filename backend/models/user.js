import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  middleName: { type: String, required: true },
  lastName: { type: String, required: true },
  upMail: { type: String, required: true },
  password: { type: String, required: true },
  studentNumber: { type: String, required: false },
  userType: { type: String, required: true },
  adviser: { type: Schema.Types.ObjectId, ref: "User", required: false },
  application: [{ type: Schema.Types.ObjectId, ref: "Application" }],
});

const User = mongoose.model("User", UserSchema);

export { UserSchema, User };