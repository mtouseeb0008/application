const Application = require("../models/application");
const Post = require("../models/post");
const { post } = require("../routes");
module.exports.home = function (req, res) {
  // Post.find({}, function (err, posts) {
  //   return res.render("home", {
  //     title: "kuldeep",
  //     posts: posts,
  //   });
  // });
  // populate user object
  Post.find({})
    .populate("student")
    .exec(function (err, post) {
      return res.render("home", {
        title: "kuldeep",
        posts: post,
      });
    });
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
