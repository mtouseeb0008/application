const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
  teacherId: {
    type: Number,
    required: true,
    unique: true,
  },
  teacherName: {
    type: String,
    required: true,
  },
  teacherDepartment: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const Teacher = mongoose.model("Teacher", TeacherSchema);
module.exports = Teacher;
