import mongoose, { Schema } from "mongoose";

const packSchema = new Schema(
    {
    packid: {
      type: String,
      unique: true,
    },
        packagename: {
            type: String,
            required: true
        },
        packageurl: {
            type: String,
            default: "",
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

packSchema.pre("save", async function (next) {
  if (!this.packid) {
    try {
      const allPacks = await mongoose.model("Pack").find({});
      let maxNumber = 96;

      for (let pack of allPacks) {
        const match = pack.packid?.match(/\d+$/);
        if (match) {
          const number = parseInt(match[0], 10);
          if (number > maxNumber) maxNumber = number;
        }
      }

      const newNumber = maxNumber + 1;
      this.packid = String(newNumber).padStart(4, "0");
    } catch (error) {
      return next(error);
    }
  }
  next();
});


const Pack = mongoose.models.Pack || mongoose.model("Pack", packSchema, "pack");

export default Pack;
