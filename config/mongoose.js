const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/application_manage_db");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // we're connected!
  console.log("succues fully connected to database");
});
