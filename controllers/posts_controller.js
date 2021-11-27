const Post = require("../models/post");
const Comment = require("../models/comment");
module.exports.create = function (req, res) {
  console.log(req.body);
  Post.create(
    {
      branch: req.body.branch,
      subject: req.body.subject,
      year: req.body.year,
      teacher: req.body.teacher,
      mobile: req.body.contact,
      content: req.body.content,
      student: req.user._id,
    },
    function (err, post) {
      if (err) {
        console.log("error in creating post");
      }
      return res.render("applicationdata", {
        title: "post",
        posts: post,
      });
    }
  );
};
module.exports.search = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect(`/post/applicationdata/${req.body.complainno}`);
  }
  return res.render("student_sign", {
    title: "Student signin",
  });
};

module.exports.destroy = function (req, res) {
  Post.findById(req.params.id, function (err, post) {
    //.id  means converting i din Object in to strign

    if (post.student == req.user.id) {
      post.remove();

      Comment.deleteMany({ post: req.params.id }, function (err) {
        return res.redirect("back");
      });
    } else {
      return res.redirect("back");
    }
  });
};

module.exports.ragister = function (req, res) {
  if (req.isAuthenticated()) {
    return res.render("complain_ragister", {
      title: "post",
    });
  }
  return res.render("student_sign", {
    title: "Student signin",
  });
};

module.exports.applicationdata = async function (req, res) {
  let post = await Post.findById(req.params.id);
  if (req.isAuthenticated()) {
    return res.render("applicationdata", {
      title: "application",
      posts: post,
    });
  }
  return res.render("student_sign", {
    title: "Student signin",
  });
};
