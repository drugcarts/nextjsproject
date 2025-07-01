import mongoose, { Schema } from "mongoose";

const doctorSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.ObjectId,
            default: ""
        },
        specialist_name: {
            type: String,
            required: true
        },
        specialist_url: {
            type: String,
            default: ""
        },
        doctor_name: {
            type: String,
            default: ""
        },
        url: {
            type: String,
            default: ""
        },
        picture: {
            type: String,
            default: ""
        },
        imagealt: {
            type: String,
            default: ""
        },
        doctor_no: {
            type: String,
            default: ""
        },
        gender: {
            type: String,
            default: ""
        },
        email: {
            type: String,
            default: ""
        },
        phone: {
            type: String,
            default: ""
        },
        language: {
            type: String,
            default: ""
        },
        experience: {
            type: String,
            default: ""
        },
        qualification: {
            type: String,
            default: ""
        },
        consult_fees: {
            type: String,
            default: ""
        },
        pwh: {
            type: String,
            default: ""
        },
        cwh_name: {
            type: String,
            default: ""
        },
        ug_degree: {
            type: String,
            default: ""
        },
        ug_city: {
            type: String,
            default: ""
        },
        ug_certificate: {
            type: String,
            default: ""
        },
        pg_degree: {
            type: String,
            default: ""
        },
        pg_city: {
            type: String,
            default: ""
        },
        pg_certificate: {
            type: String,
            default: ""
        },
        country: {
            type: String,
            default: ""
        },
        state: {
            type: String,
            default: ""
        },
        city: {
            type: String,
            default: ""
        },
        address: {
            type: String,
            default: ""
        },
        status: {
            type: String,
            default: "Active",
            enum: ["Active", "InActive"]
        },
    }, { timestamps: true }
)



const Doctor = mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema, "doctors");

export default Doctor;
