// student sign
const Student = require("../models/student");
module.exports.profile = function (req, res) {
  Student.findById(req.params.id, function (err, student) {
    return res.render("profile", {
      title: "profile",
      profile_user: student,
    });
  });
};
module.exports.update = function (req, res) {
  if (req.user.id == req.params.id) {
    Student.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      function (err, student) {
        return res.redirect("back");
      }
    );
  } else {
    return res.status(401).send("unathorised");
  }
};
module.exports.signup = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/student/profile");
  }
  return res.render("student_sign_up", {
    title: "Student signup",
  });
};
//studen sign in page
module.exports.signin = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/student/profile");
  }
  return res.render("student_sign", {
    title: "Student signin",
  });
};
// student database
module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }
  Student.findOne({ rollno: req.body.rollno }, function (err, student) {
    if (err) {
      console.log("student loging failed");
      return;
    }
    if (!student) {
      Student.create(
        {
          name: req.body.name,
          rollno: req.body.rollno,
          password: req.body.password,
        },
        function (err, newApplication) {
          if (err) {
            console.log("error in creating application");
            return;
          }
          console.log("******", newApplication);
          return res.redirect("/student/sign-in");
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
