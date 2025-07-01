import mongoose, { Schema } from "mongoose";

const videoFeedbackSchema = new Schema(
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
    uploadvideo: {
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

const VideoFeedback = mongoose.models.VideoFeedback || mongoose.model("VideoFeedback", videoFeedbackSchema, "video_feedback");

export default VideoFeedback;
