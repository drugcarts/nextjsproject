import mongoose, { Schema } from "mongoose";

const manufactuerSchema = new Schema(
    {
        manufactuername: {
            type: String,
            required: true,
        },
        manufactuerurl: {
            type: String,
            default: ""
        },
        manufactueraddress: {
            type: String,
            default: "",
        },
        metatitle: {
            type: String,
            default: ""
        },
        metadesc: {
            type: String,
            default: ""
        },
        metakeyword: {
            type: String,
            default: ""
        },
    },
    {
        timestamps: true,
    }
);

const Manufactuer = mongoose.models.Manufactuer || mongoose.model("Manufactuer", manufactuerSchema, "manufactuer");

export default Manufactuer;
