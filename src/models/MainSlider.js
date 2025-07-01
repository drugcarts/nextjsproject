import mongoose, { Schema } from "mongoose";

const MainSliderSchema = new Schema(
    {
        title: {
            type: String,
            default: ""
        },
        url: {
            type: String,
            default: ""
        },
        slide_image: {
            type: String,
            default: ""
        },
        orderno: {
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



const MainSlider = mongoose.models.MainSlider || mongoose.model("MainSlider", MainSliderSchema, "mainslider");

export default MainSlider;
