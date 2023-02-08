import mongoose from "mongoose";
import { IEmployee } from "../interfaces.js";
const employeeSchema = new mongoose.Schema<IEmployee>(
  {
    firstName: String,
    lastName: String,
    title: String,
    notes: String,
  },
  { versionKey: false }
);

export const Employee = mongoose.model("employee", employeeSchema);
