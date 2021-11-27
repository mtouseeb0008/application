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
    let student1 = await Student.find({});
    let student = await Student.findById(req.params.id);
    return res.render("status2", {
      title: "status",
      posts: post,
      all_users: student1,
      profile_user: student,
    });
  } catch (err) {
    console.log(err);
  }
  // populate user object
  // try {
  //   let post = await Post.find({})
  //     .populate("student")
  //     .populate({
  //       path: "comments",
  //       populate: {
  //         path: "student",
  //       },
  //     });
  //     let student1 = await Student.find({});
  //     Student.findById(req.params.id, function (err, student) {
  //       return res.render("status2", {
  //         title: "status",
  //         profile_user: student,
  //         posts: post,
  //         all_users: student1,
  //       });
  // }}
  // catch(err) {
  //   console.log(err);
  // }
};
