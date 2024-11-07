import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/db";

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true
    },
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Editor: Number,
        Admin: Number
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: String
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;