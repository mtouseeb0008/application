const express = require("express");
const router = express.Router();
const passport = require("passport");
const postController = require("../controllers/posts_controller");
router.post("/create", passport.checkAuthentication, postController.create);
router.post("/search", passport.checkAuthentication, postController.search);
router.get("/ragister", passport.checkAuthentication, postController.ragister);
router.get(
  "/applicationdata",
  passport.checkAuthentication,
  postController.applicationdata
);
router.get(
  "/applicationdata/:id",
  passport.checkAuthentication,
  postController.applicationdata
);
router.get(
  "/destroy/:id",
  passport.checkAuthentication,
  postController.destroy
);
module.exports = router;
