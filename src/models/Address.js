import mongoose, { Schema } from "mongoose";

const addressSchema = new Schema(
  {
    cus_id: {
      type: mongoose.Schema.Types.ObjectId,
      default: "User"
    },
    type: {
      type: String,
      default: "Home"
    },
    cus_name: {
      type: String,
      default: ""
    },
    lastname: {
      type: String,
      default: ""
    },
    phone: {
      type: String,
      default: ""
    },
    email: {
      type: String,
      default: ""
    },
    address: {
      type: String,
      default: ""
    },
    postcode: {
      type: String,
      default: ""
    },
    state: {
      type: String,
      default: ""
    },
    country: {
      type: String,
      default: ""
    },
    town: {
      type: String,
      default: ""
    },
    status: {
      type: String,
      default: "Active",
      enum: ["Active", "InActive"]
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    updated_at: {
      type: Date,
      default: Date.now
    },
  }
);
const Customer =
  mongoose.models.Customer ||
  mongoose.model("Customer", addressSchema, "address");

export default Customer;
