import mongoose, { Schema } from "mongoose";

const ServiceenquirySchema = new Schema(
    {
        service: {
            type: String,
            defalut: ""
        },
        name: {
            type: String,
            defalut: ""
        },
        mobile: {
            type: String,
            defalut: ""
        },
        email: {
            type: String,
            defalut: ""
        },
        city: {
            type: String,
            defalut: ""
        },
        timestamp: {
            type: String,
            defalut: ""
        },
        updated_at: {
            type: Date,
            defalut: Date.now
        },
        status: {
            type: String,
            default: "Active",
            enum: ["Active", "InActive"]
        },
    },
    { timestamps: true }
)


const Serviceenquiry = mongoose.models.Serviceenquiry || mongoose.model("Serviceenquiry", ServiceenquirySchema, "Serviceenquiry");

export default Serviceenquiry;
