const express = require("express");
const router = express.Router();
const passport = require("passport");
const TeacherController = require("../controllers/teacher_controller");

router.get("/profile", passport.checkAuthentication, TeacherController.profile);
router.get("/sign-in", TeacherController.signin);
router.get("/sign-up", TeacherController.signup);
router.get("/sign-out", TeacherController.destroySession);

router.post("/create", TeacherController.create);
// use passport as middleware to authentication
router.post(
  "/create-session",
  passport.authenticate("teacher", { failureRedirect: "/teacher/sign-in" }),
  TeacherController.createSession
);
module.exports = router;
