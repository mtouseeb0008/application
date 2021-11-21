const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    student: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Student",
    },
    post: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Post",
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
