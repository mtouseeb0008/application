const Application = require("../models/application");
module.exports.home = function (req, res) {
  console.log(req.cookies);
  return res.render("home", {
    title: "kuldeep",
  });
};
module.exports.contact = function (req, res) {
  Application.find({}, function (err, applicationdata) {
    if (err) {
      console.log("Error in fethcing detail");
    }
    return res.render("contact", {
      title: "contact",
      applicationdata: applicationdata,
    });
  });
};
module.exports.delete = function (req, res) {
  let id = req.query.id;
  Application.findByIdAndDelete(id, function (err) {
    if (err) {
      conslog.error("Error in fethcing detail", err);
    }
    return res.redirect("back");
  });
};
