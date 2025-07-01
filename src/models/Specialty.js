import mongoose, { Schema } from "mongoose";

const specialtySchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.ObjectId,
            default: ""
        },
        specialty_name: {
            type: String,
            required: true
        },
        url: {
            type: String,
            default: ""
        },
        image: {
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
    { timestamps: true }
)



const Specialty = mongoose.models.Specialty || mongoose.model("Specialty", specialtySchema, "specialty");

export default Specialty;
