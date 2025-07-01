import mongoose, { Schema } from "mongoose";

const labpackageSchema = new Schema(
    {
        packageName: {
            type: String,
            default: ""
        },
        url: {
            type: String,
            default: ""
        },
        image: {
            type: String,
            default: ""
        },
        alt: {
            type: String,
            default: ""
        },
        userId: {
            type: mongoose.Schema.ObjectId,
            default: ""
        },
        status: {
            type: String,
            default: "Active",
            enum: ["Active", "InActive"]
        },
    },
    { timestamps: true }
)



const LabPackage = mongoose.models.LabPackage || mongoose.model("LabPackage", labpackageSchema, "labpackage");

export default LabPackage;
