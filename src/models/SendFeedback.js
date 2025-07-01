import mongoose, { Schema } from "mongoose";

const SendFeedbackSchema = new Schema(
    {
        comments: {
            type: String,
            default: ""
        },
        rating: {
            type: String,
            default: ""
        },
        ratingStatus: {
            type: String,
            default: ""
        },
        username: {
            type: String,
            default: ""
        },
        picture: {
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

const SendFeedback = mongoose.models.SendFeedback || mongoose.model("SendFeedback", SendFeedbackSchema, "send_feedback");

export default SendFeedback;
