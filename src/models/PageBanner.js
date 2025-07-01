import mongoose, { Schema } from "mongoose";

const PageBannerSchema = new Schema(
    {
        pagename: {
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



const PageBanner = mongoose.models.PageBanner || mongoose.model("PageBanner", PageBannerSchema, "pagebanner");

export default PageBanner;
