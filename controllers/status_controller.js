const Post = require("../models/post");
const Student = require("../models/student");

module.exports.getstatus = async function (req, res) {
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

    return res.render("status", {
      title: "kuldeep",
      posts: post,
      all_users: student,
    });
  } catch (err) {
    console.log(err);
  }
};
