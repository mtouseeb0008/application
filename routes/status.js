const express = require("express");
const router = express.Router();
const passport = require("passport");
const statusController = require("../controllers/status_controller");
router.get(
  "/getstatus",
  passport.checkAuthentication,
  statusController.getstatus
);

module.exports = router;
