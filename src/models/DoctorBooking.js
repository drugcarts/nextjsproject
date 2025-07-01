import mongoose, { Schema } from "mongoose";

const doctorBookingSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.ObjectId,
            default: ""
        },
        doctor_name: {
            type: String,
            required: true
        },
        name: {
            type: String,
            default: ""
        },
        email: {
            type: String,
            default: ""
        },
        age: {
            type: String,
            default: ""
        },
        phone: {
            type: String,
            default: ""
        },
        gender: {
            type: String,
            default: ""
        },
        city: {
            type: String,
            default: ""
        },
        date: {
            type: Date,
            default: ""
        },
        time: {
            type: String,
            default: ""
        },
        appoinment_id: {
            type: String,
            unique: true
        },
        payment_type: {
            type: String,
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

doctorBookingSchema.pre("save", async function (next) {
    if (!this.appoinment_id) {
        try {
            const lastRecord = await mongoose
                .model("DoctorBooking")
                .findOne({})
                .sort({ createdAt: -1 });

            let newIdNum = 1;

            if (lastRecord?.appoinment_id) {
                const match = lastRecord.appoinment_id.match(/(\d+)$/);
                if (match) {
                    newIdNum = parseInt(match[1]) + 1;
                }
            }

            this.appoinment_id = `DC-appoinment-${newIdNum}`;
        } catch (error) {
            return next(error);
        }
    }

    next();
});

const DoctorBooking = mongoose.models.DoctorBooking || mongoose.model("DoctorBooking", doctorBookingSchema, "doctor_booking");

export default DoctorBooking;
