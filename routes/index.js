const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home_controller");
const Application = require("../models/application");
router.get("/", homeController.home);
router.get("/contact", homeController.contact);
router.get("/delete", homeController.delete);
router.post("/post_application", function (req, res) {
  Application.create(
    {
      name: req.body.name,
      rollno: req.body.rollno,
    },
    function (err, newApplication) {
      if (err) {
        console.log("error in creating application");
        return;
      }
      console.log("******", newApplication);
      return res.redirect("back");
    }
  );
});
module.exports = router;
