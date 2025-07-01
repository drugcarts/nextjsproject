import mongoose, { Schema } from "mongoose";

const callDoctorSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.ObjectId,
            default: ""
        },
        doctor_name: {
            type: String,
            required: true
        },
        customer_phone: {
            type: String,
            default: ""
        },
        customer_name: {
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
        reason: {
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

callDoctorSchema.pre("save", async function (next) {
    if (!this.appoinment_id) {
        try {
            const lastRecord = await mongoose
                .model("CallDoctor")
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

const CallDoctor = mongoose.models.CallDoctor || mongoose.model("CallDoctor", callDoctorSchema, "call_doctor");

export default CallDoctor;
