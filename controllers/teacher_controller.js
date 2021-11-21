// Teacher sign
const Teacher = require("../models/teacher");
module.exports.profile = function (req, res) {
  return res.render("profile", {
    title: "profile",
  });
};
module.exports.signup = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/teacher/profile");
  }
  return res.render("teacher_signup", {
    title: "Teacher signup",
  });
};
//studen sign in page
module.exports.signin = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/teacher/profile");
  }
  return res.render("teacher_sign_in", {
    title: "teacher signin",
  });
};
// Teacher database
module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }
  Teacher.findOne({ teaherId: req.body.teaherId }, function (err, teacher) {
    if (err) {
      console.log("Teacher loging failed");
      return;
    }
    if (!teacher) {
      console.log(req.body),
        Teacher.create(
          {
            teacherName: req.body.name,
            teacherDepartment: req.body.teacherDepartment,
            teacherId: req.body.teacherId,
            password: req.body.password,
          },
          function (err, newApplication) {
            if (err) {
              console.log("error in creating application");
              return;
            }
            console.log("******", newApplication);
            return res.redirect("/teacher/sign-in");
          }
        );
    } else {
      return res.redirect("back");
    }
  });
};

/// creating session for sign in request

module.exports.createSession = function (req, res) {
  //todo later
  return res.redirect("/");
};

module.exports.destroySession = function (req, res) {
  req.logout();
  return res.redirect("/");
};
