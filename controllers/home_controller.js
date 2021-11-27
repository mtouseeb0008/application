const Application = require("../models/application");
const Post = require("../models/post");
const Student = require("../models/student");
const { post } = require("../routes");
module.exports.home = async function (req, res) {
  // populate user object
  try {
    let post = await Post.find({})
      .populate("student")
      .populate({
        path: "comments",
        populate: {
          path: "student",
        },
      });
    let student = await Student.find({});

    return res.render("home", {
      title: "home",
      posts: post,
      all_users: student,
    });
  } catch (err) {
    console.log(err);
  }
};
module.exports.contact = function (req, res) {
  Application.find({}, function (err, applicationdata) {
    if (err) {
      console.log("Error in fethcing detail");
    }
    return res.render("contact", {
      title: "contact",
      applicationdata: applicationdata,
    });
  });
};
module.exports.delete = function (req, res) {
  let id = req.query.id;
  Application.findByIdAndDelete(id, function (err) {
    if (err) {
      conslog.error("Error in fethcing detail", err);
    }
    return res.redirect("back");
  });
};
