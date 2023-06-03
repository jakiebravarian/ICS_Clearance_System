import mongoose from "mongoose";
const { Schema } = mongoose;

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


export {AppSchema};