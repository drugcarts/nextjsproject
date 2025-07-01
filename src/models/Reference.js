import mongoose, { Schema } from "mongoose";

const referenceSchema = new Schema(
    {
        websitename: {
            type: String,
            required: true
        },
        url: {
            type: String,
            default: ""
        },
        adddate: {
            type: String,
            default: ""
        },
        updatedate: {
            type: String,
            default: ""
        },
        adduser: {
            type: String,
            default: ""
        },
        updateuser: {
            type: String,
            default: "1"
        },
        status: {
            type: String,
            default: "Active",
            enum: ["Active", "InActive"]
        },
    },
    { timestamps: true }
)



const Reference = mongoose.models.Reference || mongoose.model("Reference", referenceSchema, "reference");

export default Reference;
