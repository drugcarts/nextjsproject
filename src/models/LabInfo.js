import mongoose, { Schema } from "mongoose";

const LabInfoSchema = new Schema(
    {
        id: {
            type: String,
            default: ""
        },
        title: {
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
        imagealt: {
            type: String,
            default: ""
        },
        description: {
            type: String,
            default: ""
        },
        category: {
            type: String,
            default: ""
        },
        status: {
            type: String,
            default: "Active",
            enum: ["Active", "InActive"]
        },
        date: {
            type: Date,
            default: Date.now
        },
        timestamp: {
            type: Date,
            default: Date.now
        },
        updated_at: {
            type: Date,
            default: Date.now
        }
    }
)



const LabInfo = mongoose.models.LabInfo || mongoose.model("LabInfo", LabInfoSchema, "lab_information");

export default LabInfo;
