import mongoose, { Schema } from "mongoose";

const testPackageSchema = new Schema(
    {
        name: {
            type: String,
            default: ""
        },
        packageName: {
            type: String,
            default: ""
        },
        packageurl: {
            type: String,
            default: ""
        },
        testname: {
            type: String,
            default: ""
        },
        url: {
            type: String,
            default: ""
        },
        nooftest: {
            type: String,
            default: ""
        },
        logo: {
            type: String,
            default: ""
        },
        image: {
            type: String,
            default: ""
        },
        price: {
            type: String,
            default: ""
        },
        saleprice: {
            type: String,
            default: ""
        },
        discount: {
            type: String,
            default: ""
        },
        type: {
            type: String,
            default: ""
        },
        required: {
            type: String,
            default: ""
        },
        offervalid: {
            type: String,
            default: ""
        },
        labdescription: {
            type: String,
            default: ""
        },
        description: {
            type: String,
            default: ""
        },
        certificates: {
            type: String,
            default: ""
        },
        testincludes: {
            type: String,
            default: ""
        },
        deliverytiming: {
            type: String,
            default: ""
        },
        procedure: {
            type: String,
            default: ""
        },
        note: {
            type: String,
            default: ""
        },
        userId: {
            type: mongoose.Schema.ObjectId,
            default: ""
        },
        status: {
            type: String,
            default: "Active",
            enum: ["Active", "InActive"]
        },
    },
    { timestamps: true }
)



const TestPackage = mongoose.models.TestPackage || mongoose.model("TestPackage", testPackageSchema, "labtest");

export default TestPackage;
