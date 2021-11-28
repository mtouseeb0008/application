const express = require("express");
const cookieParser = require("cookie-parser");
//before express is fireup
const db = require("./config/mongoose");
// use for session cookies
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategis");
const MongoStore = require("connect-mongo");
const Application = require("./models/application");
const app = express();
const port = process.env.PORT || 8000;
const expressLayout = require("express-ejs-layouts");
app.use(express.static("assets"));
app.use(express.urlencoded());
app.use(cookieParser());
//make the upload path to brouser
app.use("/uploads/", express.static(__dirname + "/uploads"));
app.use(expressLayout);
app.set("view engine", "ejs");
app.set("views", "./views");
app.set("layout extractStyle", true);
app.set("layout extractScript", true);
//mongo store is used to store the sesson cookie int the db

app.use(
  session({
    name: "application",
    secret: "blasomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 100 * 60 * 10000,
    },
    store: MongoStore.create(
      {
        mongoUrl: "mongodb://localhost/application_manage_db",
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "connect-mongodb setup ok");
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedStudent);
// app.use(passport.setAuthenticatedTeacher);
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log("error is rendaring");
    return;
  } else {
    console.log("sever is runnig on port ", port);
  }
});
