import mongoose, { Schema } from "mongoose";

const textFeedbackSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: ""
    },
    username: {
      type: String,
      default: ""
    },
    phone: {
      type: String,
    },
    useremail: {
      type: String,
      default: ""
    },
    address: {
      type: String,
      default: ""
    },
    discount: {
      type: String,
      default: ""
    },
    date: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

const TextFeedback = mongoose.models.TextFeedback || mongoose.model("TextFeedback", textFeedbackSchema, "text_feedback");

export default TextFeedback;
