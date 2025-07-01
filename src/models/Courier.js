import mongoose, { Schema } from "mongoose";

const courierSchema = new Schema(
    {
        couriername: {
            type: String,
            required: true
        },
        website: {
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



const Courier = mongoose.models.Courier || mongoose.model("Courier", courierSchema, "courier");

export default Courier;
