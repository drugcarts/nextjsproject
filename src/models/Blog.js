import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema(
    {
        blogname: {
            type: String,
            default: ""
        },
        blogimg: {
            type: String,
            default: ""
        },
        blogspoturl: {
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
        blogtype: {
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
        metakeyword: {
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

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema, "blog");

export default Blog;
