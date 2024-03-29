import mongoose from "mongoose";
const { Schema } = mongoose;

const AppSchema = new Schema({
  student: {type: Schema.Types.ObjectId, ref: "User"},
  status: { type: String, required: true },
  step: { type: Number, required: true },
  remarks: [
    {
      remark: { type: String, required: false },
      dateRemark: { type: String, required: false },
      commenter: { type: Schema.Types.ObjectId, ref: "User", required: false },
      stepGivenRemark: { type: Number, required: false },
    },
  ],
  studentSubmission: {
    remarkSubmission: { type: String, required: false },
    dateSubmission: { type: String, required: false },
    stepGivenSubmission: { type: Number, required: false },
  },
});

const Application = mongoose.model("Application", AppSchema);


export {AppSchema,Application};