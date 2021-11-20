const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student_controller");
router.get("/sign-in", studentController.signin);
router.get("/sign-up", studentController.signup);
router.post("/data", studentController.data);

module.exports = router;
