const Post = require("../models/post");
const Comment = require("../models/comment");
module.exports.create = function (req, res) {
  Post.create(
    {
      content: req.body.content,
      student: req.user._id,
    },
    function (err, post) {
      if (err) {
        console.log("error in creating post");
      }
      return res.redirect("back");
    }
  );
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
