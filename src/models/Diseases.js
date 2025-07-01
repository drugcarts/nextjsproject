import mongoose, { Schema } from "mongoose";

const DiseasesSchema = new Schema(
    {
        name: {
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
        generics: {
            type: String,
            default: ""
        },
        video: {
            type: String,
            default: ""
        },
        videoalt: {
            type: String,
            default: ""
        },
        about: {
            type: String,
            default: ""
        },
        structure: {
            type: String,
            default: ""
        },
        epidemiology: {
            type: String,
            default: ""
        },
        classfi: {
            type: String,
            default: ""
        },
        causativefa: {
            type: String,
            default: ""
        },
        riskfc: {
            type: String,
            default: ""
        },
        pathophysiology: {
            type: String,
            default: ""
        },
        routes: {
            type: String,
            default: ""
        },
        symptoms: {
            type: String,
            default: ""
        },
        labtest: {
            type: String,
            default: ""
        },
        radiology: {
            type: String,
            default: ""
        },
        diagnostic: {
            type: String,
            default: ""
        },
        medical: {
            type: String,
            default: ""
        },
        surgical: {
            type: String,
            default: ""
        },
        prognosis: {
            type: String,
            default: ""
        },
        comp: {
            type: String,
            default: ""
        },
        prevention: {
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



const Dieases = mongoose.models.Dieases || mongoose.model("Dieases", DiseasesSchema, "dieases");

export default Dieases;
