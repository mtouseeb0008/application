const express = require("express");
const cookieParser = require("cookie-parser");
//before express is fireup
const db = require("./config/mongoose");
const Application = require("./models/application");
const app = express();
const port = process.env.PORT || 8000;
const expressLayout = require("express-ejs-layouts");
app.use(express.static("assets"));
app.use(express.urlencoded());
app.use(cookieParser());
app.use(expressLayout);
app.set("view engine", "ejs");
app.set("views", "./views");
app.set("layout extractStyle", true);
app.set("layout extractScript", true);
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log("error is rendaring");
    return;
  } else {
    console.log("sever is runnig on port ", port);
  }
});
