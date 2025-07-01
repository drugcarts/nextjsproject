import mongoose, { Schema } from "mongoose";

const HerbsSchema = new Schema(
    {
        title: {
            type: String,
            default: ""
        },
        url: {
            type: String,
            default: ""
        },
        picture: {
            type: String,
            default: ""
        },
        alt: {
            type: String,
            default: "",
        },
        description: {
            type: String,
            default: ""
        },
        languages: {
            type: String,
            default: ""
        },
        origin: {
            type: String,
            default: ""
        },
        composition: {
            type: String,
            default: ""
        },
        types: {
            type: String,
            default: ""
        },
        infection: {
            type: String,
            default: ""
        },
        eydsorder: {
            type: String,
            default: ""
        },
        hedsorder: {
            type: String,
            default: ""
        },
        significance: {
            type: String,
            default: ""
        },
        dailylife: {
            type: String,
            default: ""
        },
        sideeffects: {
            type: String,
            default: ""
        },
        compounds: {
            type: String,
            default: ""
        },
        modernview: {
            type: String,
            default: ""
        },
        dosage: {
            type: String,
            default: ""
        },
        precautions: {
            type: String,
            default: ""
        },
        contraindicate: {
            type: String,
            default: ""
        },
        benefits: {
            type: String,
            default: ""
        },
        faq: {
            type: String,
            default: ""
        },
        reference: {
            type: String,
            default: ""
        },
        metatitle: {
            type: String,
            default: ""
        },
        metakeyboard: {
            type: String,
            default: ""
        },
        metadesc: {
            type: String,
            default: ""
        },
        reviewsy: {
            type: String,
            default: ""
        },
        writensy: {
            type: String,
            default: ""
        },
        medicinal: {
            type: String,
            default: ""
        },
        treatment: {
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
        },
    }
)



const Herbs = mongoose.models.Herbs || mongoose.model("Herbs", HerbsSchema, "herbs");

export default Herbs;
