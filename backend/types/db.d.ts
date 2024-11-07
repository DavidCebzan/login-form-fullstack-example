import mongoose from "mongoose";

interface IUser extends mongoose.Document {
    username: string
    roles: {
        User: number
        Editor: number,
        Admin: number
    },
    password: string,
    refreshToken: string
}

interface IEmployee extends mongoose.Document {
    firstname: string
    lastname: string
}