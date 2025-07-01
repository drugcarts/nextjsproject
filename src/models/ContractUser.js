import mongoose, { Schema } from "mongoose";

const ContractUserSchema = new Schema(
    {
        id: {
            type: String,
            default: ""
        },
        username: {
            type: String,
            default: ""
        },
        generices: {
            type: String,
        },
        amount: {
            type: String,
            default: ""
        },
        status: {
            type: String,
            default: "Active",
        },
        timestamp: {
            type: Date,
            default: Date.now,
        },
    }
);

const ContractUser = mongoose.models.ContractUser || mongoose.model("ContractUser", ContractUserSchema, "contract_users");

export default ContractUser;
