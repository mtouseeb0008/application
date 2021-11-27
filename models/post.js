const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    branch: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    teacher: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    student: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Student",
    },
    // include the array of ids of all comments in this post schema itself
    comments: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
