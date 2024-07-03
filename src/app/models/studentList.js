import mongoose, { Schema } from "mongoose";

const StudentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    dateOfAdmission: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const students =
  mongoose.models.students || mongoose.model("students", StudentSchema);
export default students;
