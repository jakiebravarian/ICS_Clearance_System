import mongoose from "mongoose";
const { Schema } = mongoose;
import { UserSchema } from "./user";

const AppSchema = new Schema({
  status: { type: String, required: true },
  step: { type: Number, required: true },
  remarks: [
    {
      remark: { type: String, required: true },
      dateRemark: { type: String, required: true },
      commenter: { type: Schema.Types.ObjectId, ref: "User", required: true },
      stepGivenRemark: { type: Number, required: true },
    },
  ],
  studentSubmission: {
    remarkSubmission: { type: String, required: true },
    dateSubmission: { type: Date, required: true },
    stepGivenSubmission: { type: Number, required: true },
  },
});
const User = mongoose.model("User", UserSchema);
const Application = mongoose.model("Application", AppSchema);

export{AppSchema};