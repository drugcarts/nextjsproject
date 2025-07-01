import mongoose, { Schema } from "mongoose";

const AdminUserSchema = new Schema(
    {
        id: {
            type: String,
            default: ""
        },
        username: {
            type: String,
            default: ""
        },
        email: {
            type: String,
        },
        password: {
            type: String,
            default: ""
        },
        role: {
            type: String,
            default: ""
        },
        isdel: {
            type: String,
            default: ""
        },
        deluser: {
            type: String,
            default: ""
        },
        salary: {
            type: String,
            default: "0"
        },
        status: {
            type: String,
            default: "Active",
        },
        timestamp: {
            type: Date,
            default: Date.now,
        },
        updatetime: {
            type: Date,
            default: Date.now,
        },
        updated_by: {
            type: String,
            default: "1",
        },
        updated: {
            type: Date,
            default: Date.now,
        },
    }
);

const AdminUser = mongoose.models.AdminUser || mongoose.model("AdminUser", AdminUserSchema, "admin_users");

export default AdminUser;
