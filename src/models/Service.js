import mongoose, { Schema } from "mongoose";

const stockSchema = new Schema(
    {
        title: {
            type: String,
            defalut: ""
        },
        image: {
            type: String,
            defalut: ""
        },
        url: {
            type: String,
            defalut: ""
        },
        orderno: {
            type: String,
            defalut: ""
        },
        metatitle: {
            type: String,
            default: ""
        },
        metadesc: {
            type: String,
            default: ""
        },
        metakeyboard: {
            type: String,
            default: ""
        },
        timestamp: {
            type: Date,
            defalut: Date.now
        },
        updated_at: {
            type: Date,
            defalut: Date.now
        },
        status: {
            type: String,
            default: "Active",
            enum: ["Active", "InActive"]
        },
    },
    { timestamps: true }
)


const Service = mongoose.models.Service || mongoose.model("Service", stockSchema, "drugservices");

export default Service;
