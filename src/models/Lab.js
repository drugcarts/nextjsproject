import mongoose, { Schema } from "mongoose";

const labSchema = new Schema(
    {
        labname: {
            type: String,
            default: ""
        },
        url: {
            type: String,
            default: ""
        },
        logo: {
            type: String,
            default: ""
        },
        image: {
            type: String,
            default: ""
        },
        address1: {
            type: String,
            default: ""
        },
        address2: {
            type: String,
            default: ""
        },
        description: {
            type: String,
            default: ""
        },
        metatitle: {
            type: String,
            default: ""
        },
        metakeyword: {
            type: String,
            default: ""
        },
        metadesc: {
            type: String,
            default: ""
        },
        timestamp: {
            type: Date,
            default: Date.now
        },
        status: {
            type: String,
            default: "Active",
            enum: ["Active", "InActive"]
        },
    },
    { timestamps: true }
)



const Lab = mongoose.models.Lab || mongoose.model("Lab", labSchema, "lab");

export default Lab;
