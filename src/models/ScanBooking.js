import mongoose, { Schema } from "mongoose";

const scanBookingSchema = new Schema(
    {
        scanName: {
            type: String,
            default: ""
        },
        city: {
            type: String,
            default: ""
        },
        centre: {
            type: String,
            default: ""
        },
        bookingId: {
            type: String,
            unique: true
        },
        test: {
            type: String,
            default: ""
        },
        address: {
            type: String,
            default: ""
        },
        name: {
            type: String,
            default: ""
        },
        phone: {
            type: String,
            default: ""
        },
        email: {
            type: String,
            default: "",
        },
        date: {
            type: String,
            default: ""
        },
        subject: {
            type: String,
            default: ""
        },
    },
    { timestamps: true }
);

scanBookingSchema.pre("save", async function (next) {
    if (!this.bookingId) {
        try {
            const lastScan = await mongoose.model("ScanBooking").findOne({}, {}, { sort: { bookingId: -1 } });

            let newBookingId = lastScan && lastScan.bookingId
                ? parseInt(lastScan.bookingId) + 1
                : 32500;

            this.bookingId = newBookingId.toString();
        } catch (error) {
            return next(error);
        }
    }
    next();
});

const ScanBooking = mongoose.models.ScanBooking || mongoose.model("ScanBooking", scanBookingSchema, "scan_booking");

export default ScanBooking;
