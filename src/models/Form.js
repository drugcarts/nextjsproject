import mongoose, { Schema } from "mongoose";

const formSchema = new Schema(
    {
        formname: {
            type: String,
            required: true
        },
        formurl: {
            type: String,
        },
        picture: {
            type: String,
        },
        alt: {
            type: String,
        },
        metatitle: {
            type: String,
        },
        metakeyword: {
            type: String,
        },
        metadesc: {
            type: String,
        },
        status: {
            type: String,
            default: "Active",
            enum: ["Active", "InActive"]
        },
    },
    { timestamps: true }
)



const Form = mongoose.models.Form || mongoose.model("Form", formSchema, "form");

export default Form;
