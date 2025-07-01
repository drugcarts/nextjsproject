import mongoose, { Schema } from "mongoose";

const locationSchema = new Schema(
    {
        state: {
            type: String,
            default: ""
        },
        location: {
            type: String,
            default: ""
        },
        pincode: {
            type: String,
            default: ""
        },
        date: {
            type: Date,
            default: Date.now
        },
        status: {
            type: String,
            default: "Active",
            enum: ["Active", "InActive"]
        },
        timestamp: {
            type: Date,
            default: Date.now
        },
        updated_at: {
            type: Date,
            default: Date.now
        }
    }
)



const Location = mongoose.models.Location || mongoose.model("Location", locationSchema, "location");

export default Location;
