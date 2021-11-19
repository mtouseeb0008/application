const mongoose = require("mongoose");
const applicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rollno: {
    type: Number,
    required: true,
  },
});

const Application = mongoose.model("Application", applicationSchema);
module.exports = Application;
