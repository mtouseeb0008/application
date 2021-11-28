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
      console.log(rollno, password);
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
      console.log(teacherId);
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
});

// serial the user to decide which key is kept to the cookies
// passport.serializeUser(function (teacher, done) {

//   done(null, teacher.id);
// });
// // desselinzing the user form the key in the cookies
// passport.deserializeUser(function (id, done) {
//   Teacher.findById(id, function (err, teacher) {
//     if (err) {
//       console.log("invalid Username Password");
//       return done(err);
//     }
//     return done(null, teacher);
//   });
// });
// chek if the user is authentication

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

// passport.checkAuthentication = function (req, res, next) {
//   //if the user is signed int then pass on the request to the next function controller's authentication
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   return res.redirect("/teacher/sign-in");
// };

// passport.setAuthenticatedTeacher = function (req, res, next) {
//   if (req.isAuthenticated()) {
//     res.locals.teacher = req.user;
//   }
//   next();
// };
module.exports = passport;
