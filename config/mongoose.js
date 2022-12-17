const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://kaushalkanaujiya:kaushal12345@cluster0.jpimwrb.mongodb.net/kaushal?retryWrites=true&w=majority");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // we're connected!
  console.log("succues fully connected to database");
});
