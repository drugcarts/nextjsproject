import mongoose, { Schema } from "mongoose";

const orginSchema = new Schema(
    {
        orginname: {
            type: String,
            required: true
        },
        status: {
            type: String,
            default: "Active",
            enum: ["Active", "InActive"]
        },
    },
    { timestamps: true }
)



const Orgin = mongoose.models.Orgin || mongoose.model("Orgin", orginSchema, "orgin");

export default Orgin;
