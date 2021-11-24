// student sign
const Student = require("../models/student");
const fs = require("fs");
const path = require("path");
module.exports.profile = function (req, res) {
  Student.findById(req.params.id, function (err, student) {
    return res.render("profile", {
      title: "profile",
      profile_user: student,
    });
  });
};
module.exports.update = async function (req, res) {
  // if (req.user.id == req.params.id) {
  //   Student.findByIdAndUpdate(
  //     req.params.id,
  //     { name: req.body.name },
  //     function (err, student) {
  //       return res.redirect("back");
  //     }
  //   );
  // } else {
  //   return res.status(401).send("unathorised");
  // }
  if (req.user.id == req.params.id) {
    try {
      let student = await Student.findById(req.params.id);
      Student.uploadedAvatar(req, res, function (err) {
        if (err) {
          console.log("*****multer err", err);
        }
        student.name = req.body.name;
        if (req.file) {
          if (student.avatar) {
            fs.unlinkSync(path.join(__dirname, "..", student.avatar));
          }
          //thsi is saving the path of thee uploaded file tinto the avatar field int eh user

          student.avatar = Student.avatarPath + "/" + req.file.filename;
        }
        student.save();
        return res.redirect("back");
      });
    } catch (err) {
      return res.status(401).send("unathorised");
    }
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
    return res.redirect(`/student/profile`);
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
    console.log(student);
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
