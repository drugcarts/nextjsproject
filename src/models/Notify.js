import mongoose, { Schema } from "mongoose";

const notifySchema = new Schema(
    {
        notname: {
            type: String,
            default: ""
        },
        notemail: {
            type: String,
            default: ""
        },
        notphone: {
            type: String,
            default: ""
        },
        notid: {
            type: String,
            unique: true
        },
        notproname: {
            type: String,
            default: ""
        },
        notprourl: {
            type: String,
            default: ""
        },
        status: {
            type: String,
            default: "InActive",
            enum: ["Active", "InActive"],
        },
        timestamp: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        },
    },
);

notifySchema.pre("save", async function (next) {
    if (!this.notid) {
        try {
            const lastScan = await mongoose.model("Notify").findOne({}, {}, { sort: { notid: -1 } });

            let newNotid = lastScan && lastScan.notid
                ? parseInt(lastScan.notid) + 1
                : 1500;

            this.notid = newNotid.toString();
        } catch (error) {
            return next(error);
        }
    }
    next();
});

const Notify = mongoose.models.Notify || mongoose.model("Notify", notifySchema, "notify");

export default Notify;
