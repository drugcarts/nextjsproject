import mongoose, { Schema } from "mongoose";

const orderprescriptionSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: ""
},
  enquirytype: {
    type: String,
    default: "",
  },
  rximage: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "Home",
  },
  cus_name: {
    type: String,
    default: "",
  },
  lastname: {
    type: String,
    default: "",
  },
  phone: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
  postcode: {
    type: String,
    default: "",
  },
  state: {
    type: String,
    default: "",
  },
  country: {
    type: String,
    default: "",
  },
  town: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    default: "Active",
    enum: ["Active", "InActive"],
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});
const Orderprescription =
  mongoose.models.Orderprescription ||
  mongoose.model(
    "Orderprescription",
    orderprescriptionSchema,
    "orderprescription"
  );

export default Orderprescription;
