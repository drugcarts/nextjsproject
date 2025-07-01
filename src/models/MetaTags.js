import mongoose, { Schema } from "mongoose";

const MetaTagsSchema = new Schema(
    {
        title: {
            type: String,
            default: ""
        },
        url: {
            type: String,
            default: ""
        },
        metatitletag: {
            type: String,
            default: ""
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
    }
)


const MetaTags = mongoose.models.MetaTags || mongoose.model("MetaTags", MetaTagsSchema, "metatags");

export default MetaTags;
