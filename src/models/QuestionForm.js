import mongoose, { Schema } from "mongoose";

const questionFormSchema = new Schema(
    {
        name: {
            type: String,
            default: "",
        },
        email: {
            type: String,
            default: "",
        },
        mobile: {
            type: String,
            default: "",
        },
        question: {
            type: String,
            default: "",
        },
        status: {
            type: String,
            default: "Active",
            enum: ["Active", "InActive"]
        },
    },
    { timestamps: true }
)



const QuestionForm = mongoose.models.QuestionForm || mongoose.model("QuestionForm", questionFormSchema, "question_form");

export default QuestionForm;
