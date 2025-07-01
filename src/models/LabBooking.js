import mongoose, { Schema } from "mongoose";

const labBookingSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: ""
        },
        bookingId: {
            type: String,
            unique: true
        },
        packagename: {
            type: String,
            default: ""
        },
        noofpersons: {
            type: String,
            default: ""
        },
        name1: {
            type: String,
            default: ""
        },
        age1: {
            type: String,
            default: ""
        },
        gender1: {
            type: String,
            default: ""
        },
        name2: {
            type: String,
            default: ""
        },
        age2: {
            type: String,
            default: ""
        },
        gender2: {
            type: String,
            default: ""
        },
        name3: {
            type: String,
            default: ""
        },
        age3: {
            type: String,
            default: ""
        },
        gender3: {
            type: String,
            default: ""
        },
        name4: {
            type: String,
            default: ""
        },
        age4: {
            type: String,
            default: ""
        },
        gender4: {
            type: String,
            default: ""
        },
        name5: {
            type: String,
            default: ""
        },
        age5: {
            type: String,
            default: ""
        },
        gender5: {
            type: String,
            default: ""
        },
        email: {
            type: String,
            default: ""
        },
        phone: {
            type: String,
            default: ""
        },
        address: {
            type: String,
            default: ""
        },
        appoitmentdate: {
            type: Date,
            default: ""
        },
        timing: {
            type: String,
            default: ""
        },
        tests: {
            type: [String],
            default: [""],
        },
        hardcopy: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
)

labBookingSchema.pre("save", async function (next) {
    if (!this.bookingId) {
        try {
            const lastScan = await mongoose.model("Labbooking").findOne({}, {}, { sort: { bookingId: -1 } });

            let newBookingId = lastScan && lastScan.bookingId
                ? parseInt(lastScan.bookingId) + 1
                : 2501;

            this.bookingId = newBookingId.toString();
        } catch (error) {
            return next(error);
        }
    }
    next();
});


const Labbooking = mongoose.models.Labbooking || mongoose.model("Labbooking", labBookingSchema, "labbooking");

export default Labbooking;
