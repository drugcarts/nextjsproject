import mongoose, { Schema } from "mongoose";
const mongoose = require("mongoose")

const subcategorySchema = new Schema(
    {
        cat_name: {
            type: String,
            // trim: true
        },
        subcat_name: {
            type: String
        },
        url: {
            type: String,
        },
        cat_img: {
            type: String,
            default: ""
        },
        imagealt: {
            type: String,
            default: ""
        },
        // banner: {
        //     type: String
        // },
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
        status: {
            type: String,
            default: "Active",
            enum: ["Active", "InActive"]
        },
    }, { timestamps: true })

// we will create a new collection
const Subcategory = mongoose.models.Subcategory || mongoose.model("Subcategory", subcategorySchema, "subcategory");

module.exports = Subcategory;