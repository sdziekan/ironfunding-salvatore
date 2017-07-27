var express = require("express");
var router = express.Router();
const Campaign = require("../models/campaign");

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/", (req, res, next) => {
  Campaign.find({}).populate("creator").exec((err, campaigns) => {
    res.render("index", { campaigns });
  });
});

module.exports = router;
