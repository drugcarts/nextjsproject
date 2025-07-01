import mongoose, { Schema } from "mongoose";

const stockSchema = new Schema(
    {
        name: {
            type: String,
            defalut: ""
        },
        url: {
            type: String,
            defalut: ""
        },
        date: {
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


const Stock = mongoose.models.Stock || mongoose.model("Stock", stockSchema, "stock");

export default Stock;
