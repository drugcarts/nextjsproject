import mongoose, { Schema } from "mongoose";

const contactUsSchema = new Schema(
    {
        name: {
            type: String,
            default: "",
        },
        email: {
            type: String,
            default: "",
        },
        mobile: {
            type: String,
            default: "",
        },
        message: {
            type: String,
            default: "",
        },
        type: {
            type: [String],
            default: [""],
        },
    },
    { timestamps: true }
)



const ContactUs = mongoose.models.ContactUs || mongoose.model("ContactUs", contactUsSchema, "contact_us");

export default ContactUs;
