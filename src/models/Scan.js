import mongoose, { Schema } from "mongoose";

const scanSchema = new Schema(
    {
        scantestname: {
            type: String,
            default: ""
        },
        url: {
            type: String,
            default: ""
        },
        scanImage: {
            type: String,
            default: ""
        },
        testcode: {
            type: String,
            unique: true
        },
        category: {
            type: String,
            default: ""
        },
        areas: {
            type: String,
            default: ""
        },
        description: {
            type: String,
            default: ""
        },
    },
    { timestamps: true }
);

scanSchema.pre("save", async function (next) {
    if (!this.testcode) {
        try {
            const lastScan = await mongoose.model("Scan").findOne({}, {}, { sort: { testcode: -1 } });

            let newTestCode = lastScan && lastScan.testcode
                ? parseInt(lastScan.testcode) + 1
                : 1500;

            this.testcode = newTestCode.toString();
        } catch (error) {
            return next(error);
        }
    }
    next();
});

const Scan = mongoose.models.Scan || mongoose.model("Scan", scanSchema, "scan");

export default Scan;
