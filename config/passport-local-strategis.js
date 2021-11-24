const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Student = require("../models/student");
const Teacher = require("../models/teacher");
// authentication using passport
passport.use(
  "student",
  new LocalStrategy(
    {
      usernameField: "rollno",
    },
    function (rollno, password, done) {
      // find the user and stablish id
      Student.findOne({ rollno: rollno }, function (err, student) {
        if (err) {
          console.log("error is finding user", err);
          return done(err);
        }
        if (!student || student.password != password) {
          console.log("invalid user /password");
          return done(null, false);
        }
        return done(null, student);
      });
    }
  )
);
//teacher will

passport.use(
  "teacher",
  new LocalStrategy(
    {
      usernameField: "teacherId",
    },
    function (teacherId, password, done) {
      // find the user and stablish id
      Teacher.findOne({ teacherId: teacherId }, function (err, teacher) {
        if (err) {
          console.log("error is finding user", err);
          return done(err);
        }
        if (!teacher || teacher.password != password) {
          console.log("invalid user /password");
          return done(null, false);
        }
        return done(null, teacher);
      });
    }
  )
);

// serial the user to decide which key is kept to the cookies
passport.serializeUser(function (student, done) {
  // var key = {
  //   id: student.id,
  //   type: student.userType,
  // };
  // done(null, key);
  done(null, student.id);
});
// desselinzing the user form the key in the cookies
passport.deserializeUser(function (id, done) {
  Student.findById(id, function (err, student) {
    if (err) {
      console.log("invalid Username Password");
      return done(err);
    }
    return done(null, student);
  });

  // var Model = key.type === "student" ? Student : Teacher;
  // Model.findOne(
  //   {
  //     _id: key.id,
  //   },
  //   function (err, user) {
  //     if (err) {
  //       return done(err);
  //     }
  //     return done(null, user);
  //   }
  // );
});
// chek if the user is authentication

passport.checkAuthentication = function (req, res, next) {
  //if the user is signed int then pass on the request to the next function controller's authentication
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/student/sign-in");
};

passport.setAuthenticatedStudent = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.student = req.user;
  }
  next();
};

module.exports = passport;
