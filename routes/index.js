const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home_controller");
const Application = require("../models/application");
router.get("/", homeController.home);
router.get("/contact", homeController.contact);
router.get("/delete", homeController.delete);
router.use("/student", require("./student"));
module.exports = router;
