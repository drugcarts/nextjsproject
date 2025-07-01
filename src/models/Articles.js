import mongoose, { Schema } from "mongoose";

const articlesSchema = new Schema(
    {
        blogname: {
            type: String,
            default: ""
        },
        blogimg: {
            type: String,
            default: ""
        },
        url: {
            type: String,
            default: ""
        },
        description: {
            type: String,
            default: "",
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
        imagealt: {
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
    },
    {
        timestamps: true,
    }
);

const Articles = mongoose.models.Articles || mongoose.model("Articles", articlesSchema, "articles");

export default Articles;
