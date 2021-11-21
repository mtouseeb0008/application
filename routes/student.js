const express = require("express");
const router = express.Router();
const passport = require("passport");
const studentController = require("../controllers/student_controller");
router.get("/profile", passport.checkAuthentication, studentController.profile);
router.get("/sign-in", studentController.signin);
router.get("/sign-up", studentController.signup);
router.get("/sign-out", studentController.destroySession);
router.post("/create", studentController.create);
// use passport as middleware to authentication
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "student/sign-in" }),
  studentController.createSession
);

module.exports = router;
