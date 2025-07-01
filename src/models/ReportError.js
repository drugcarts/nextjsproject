import mongoose, { Schema } from "mongoose";

const reportErrorSchema = new Schema(
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
        country: {
            type: String,
            default: "",
        },
        subject: {
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



const ReportError = mongoose.models.ReportError || mongoose.model("ReportError", reportErrorSchema, "report_error");

export default ReportError;
