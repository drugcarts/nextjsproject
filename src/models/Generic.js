import mongoose, { Schema } from "mongoose";

const genericSchema = new Schema(
    {
        catnames: {
            type: String,
            required: true,
            default: ""
        },
        subname: {
            type: String,
            required: true,
            default: ""
        },
        url: {
            type: String,
            required: true,
            default: ""
        },
        generices: {
            type: String,
            required: true,
            default: ""
        },
        gen_img: {
            type: String,
            default: ""
        },
        imagealt: {
            type: String,
            default: ""
        },
        vedio: {
            type: String,
            default: ""
        },
        vedioalt: {
            type: String,
            default: ""
        },
        description: {
            type: String,
            default: ""
        },
        usesofmeds: {
            type: String,
            default: ""
        },
        useofbenefits: {
            type: String,
            default: ""
        },
        indicat: {
            type: String,
            default: ""
        },
        mechanism: {
            type: String,
            default: ""
        },
        medicinework: {
            type: String,
            default: ""
        },
        contraindications: {
            type: String,
            default: ""
        },
        sideeffects: {
            type: String,
            default: ""
        },
        faqs: {
            type: String,
            default: ""
        },
        pregnancy: {
            type: String,
            default: ""
        },
        breastfeeding: {
            type: String,
            default: ""
        },
        kidneyproblem: {
            type: String,
            default: ""
        },
        liverdisease: {
            type: String,
            default: ""
        },
        asthma: {
            type: String,
            default: ""
        },
        takemedicine: {
            type: String,
            default: ""
        },
        adult: {
            type: String,
            default: ""
        },
        childrenmed: {
            type: String,
            default: ""
        },
        elderlymed: {
            type: String,
            default: ""
        },
        alcohol: {
            type: String,
            default: ""
        },
        heartdisease: {
            type: String,
            default: ""
        },
        driving: {
            type: String,
            default: ""
        },
        warnings: {
            type: String,
            default: ""
        },
        talkdoctor: {
            type: String,
            default: ""
        },
        instructions: {
            type: String,
            default: ""
        },
        druginteraction: {
            type: String,
            default: ""
        },
        drugfood: {
            type: String,
            default: ""
        },
        drugdiease: {
            type: String,
            default: ""
        },
        fooditems: {
            type: String,
            default: ""
        },
        overdose: {
            type: String,
            default: ""
        },
        misseddose: {
            type: String,
            default: ""
        },
        disposal: {
            type: String,
            default: ""
        },
        fasttag: {
            type: String,
            default: ""
        },
        refer: {
            type: String,
            default: ""
        },
        metatitle: {
            type: String,
            default: ""
        },
        metakeyword: {
            type: String,
            default: ""
        },
        metadesc: {
            type: String,
            default: ""
        },
        status: {
            type: String,
            default: "Active",
            enum: ["Active", "InActive"]
        },
        timestamp: {
            type: Date, default: Date.now
        },
    }, { timestamps: true })

const Generic = mongoose.models.Generic || mongoose.model("Generic", genericSchema, "generics");

module.exports = Generic;