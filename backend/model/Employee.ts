import mongoose, { Schema } from "mongoose";
import { IEmployee } from "../types/db";

const employeeSchema = new Schema<IEmployee>({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    }
});

const Employee = mongoose.model<IEmployee>('Employee', employeeSchema);

export default Employee;