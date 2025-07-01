import mongoose, { Schema } from "mongoose";

const PromotionSchema = new Schema(
    {
        title: {
            type: String,
            default: ""
        },
        url: {
            type: String,
            default: ""
        },
        image: {
            type: String,
            default: ""
        },
        alt: {
            type: String,
            default: ""
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



const Promotion = mongoose.models.Promotion || mongoose.model("Promotion", PromotionSchema, "promotion");

export default Promotion;
