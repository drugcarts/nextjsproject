import mongoose, { Schema } from "mongoose";

const storageSchema = new Schema(
    {
     storageid: {
      type: String,
      unique: true,
    },
        storagename: {
            type: String,
            required: true
        },
    timestamp: {
            type: Date,
            default: Date.now
        },
        status: {
            type: String,
            default: "Active",
            enum: ["Active", "InActive"]
        },
    },
    { timestamps: true }
)

storageSchema.pre("save", async function (next) {
  if (!this.storageid) {
    try {
      const allPacks = await mongoose.model("Storage").find({});
      let maxNumber = 96;

      for (let pack of allPacks) {
        const match = pack.storageid?.match(/\d+$/);
        if (match) {
          const number = parseInt(match[0], 10);
          if (number > maxNumber) maxNumber = number;
        }
      }

      const newNumber = maxNumber + 1;
      this.storageid = String(newNumber).padStart(4, "0");
    } catch (error) {
      return next(error);
    }
  }
  next();
});

const Storage = mongoose.models.Storage || mongoose.model("Storage", storageSchema, "storage");

export default Storage;
