import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema(
    {
        category_name: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            default: ""
        },
        cat_type: {
            type: String,
            default: "",
            enum: ["prescriptions", "non-prescriptions", "Others"]
        },
        cat_img: {
            type: String,
            default: ""
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

const Category = mongoose.models.Category || mongoose.model("Category", categorySchema, "category");

export default Category;
