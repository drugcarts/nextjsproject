import mongoose, { Schema } from "mongoose";

const askDoctorSchema = new Schema(
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
        consultation: {
            type: String,
            default: ""
        },
        city: {
            type: String,
            default: ""
        },
        weight: {
            type: String,
            default: ""
        },
        height: {
            type: String,
            default: ""
        },
        medication: {
            type: String,
            default: ""
        },
        allergies: {
            type: String,
            default: ""
        },
        conditions: {
            type: String,
            default: ""
        },
        appoinment_id: {
            type: String,
            unique: true
        },
        consult_type: {
            type: String,
            default: ""
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

askDoctorSchema.pre("save", async function (next) {
    if (!this.appoinment_id) {
        try {
            const lastRecord = await mongoose
                .model("AskDoctor")
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

const AskDoctor = mongoose.models.AskDoctor || mongoose.model("AskDoctor", askDoctorSchema, "ask_doctor");

export default AskDoctor;
