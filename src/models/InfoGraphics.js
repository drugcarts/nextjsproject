import mongoose, { Schema } from "mongoose";

const InfoGraphicsSchema = new Schema(
    {
        title: {
            type: String,
            default: ""
        },
        url: {
            type: String,
            default: ""
        },
        thuming: {
            type: String,
            default: ""
        },
        thumbalt: {
            type: String,
            default: ""
        },
        picture: {
            type: String,
            default: ""
        },
        alt: {
            type: String,
            default: "",
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
    }
)



const InfoGraphics = mongoose.models.InfoGraphics || mongoose.model("InfoGraphics", InfoGraphicsSchema, "infographics");

export default InfoGraphics;
