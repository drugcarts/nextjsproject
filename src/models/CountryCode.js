import mongoose, { Schema } from "mongoose";

const Country_codeSchema = new Schema(
    {
        country: {
            type: String,
            default: ""
        },
        code: {
            type: String,
            default: ""
        },
        flag: {
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
        updated_at: {
            type: Date,
            default: Date.now
        }
    }
)



const Country_code = mongoose.models.Country_code || mongoose.model("Country_code", Country_codeSchema, "countrycode");

export default Country_code;
