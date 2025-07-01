import mongoose, { Schema } from "mongoose";

const KnowBodySchema = new Schema(
    {
        name: {
            type: String,
            default: ""
        },
        url: {
            type: String,
            default: ""
        },
        about: {
            type: String,
            default: ""
        },
        vedio: {
            type: String,
            default: ""
        },
        image: {
            type: String,
            default: ""
        },
        status: {
            type: String,
            default: "Active",
            enum: ["Active", "InActive"]
        },
        date: {
            type: Date,
            default: Date.now
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



const KnowBody = mongoose.models.KnowBody || mongoose.model("KnowBody", KnowBodySchema, "knowbody");

export default KnowBody;
