import mongoose, { Schema } from "mongoose";

const sideeffectSchema = new Schema(
  {
    generic_name: {
      type: String,
      unique: true,
    },
    common: {
      type: String,
      required: true,
    },
    rare: {
      type: String,
      required: true,
    },
    severe: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Active",
      enum: ["Active", "InActive"],
    },
  },
  { timestamps: true }
);

const Sideeffect =
  mongoose.models.Sideeffect ||
  mongoose.model("Sideeffect", sideeffectSchema, "sideeffect");

export default Sideeffect;
