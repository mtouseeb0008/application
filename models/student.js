const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema(
  {
    rollno: {
      type: Number,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
