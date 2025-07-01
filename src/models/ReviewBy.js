import mongoose, { Schema } from "mongoose";

const ReviewbySchema = new Schema(
    {
        id: {
            type: String,
            unique: true
        },
        name: {
            type: String,
            required: true
        },
        picture: {
            type: String,
            defalut: ""
        },
        imagealt: {
            type: String,
            defalut: ""
        },
        qualification: {
            type: String,
            defalut: ""
        },
        desgination: {
            type: String,
            defalut: ""
        },
        experience: {
            type: String,
            defalut: ""
        },
        expdetails: {
            type: String,
            defalut: ""
        },
        about: {
            type: String,
            defalut: ""
        },
        date: {
            type: Date,
            default: Date.now
        },
        timestamp: {
            type: Date,
            default: Date.now
        },
        updated_at: {
            type: Date,
            default: Date.now
        },
        education: {
            type: String,
            defalut: ""
        },
        status: {
            type: String,
            default: "Active",
            enum: ["Active", "InActive"]
        },
    }
)

ReviewbySchema.pre("save", async function (next) {
  if (!this.id) {
    try {
      const allPacks = await mongoose.model("Reviewby").find({});
      let maxNumber = 96;

      for (let pack of allPacks) {
        const match = pack.id?.match(/\d+$/);
        if (match) {
          const number = parseInt(match[0], 10);
          if (number > maxNumber) maxNumber = number;
        }
      }

      const newNumber = maxNumber + 1;
      this.id = String(newNumber).padStart(4, "0");
    } catch (error) {
      return next(error);
    }
  }
  next();
});

const Reviewby = mongoose.models.Reviewby || mongoose.model("Reviewby", ReviewbySchema, "reviewby");

export default Reviewby;
