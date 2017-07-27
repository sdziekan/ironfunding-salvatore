const express = require("express");
const Campaign = require("../models/campaign");
const TYPES = require("../models/campaign-types");
const router = express.Router();
const { ensureLoggedIn } = require("connect-ensure-login");

router.get("/new", (req, res) => {
  res.render("campaigns/new", { types: TYPES });
});

router.post("/", ensureLoggedIn("/login"), (req, res, next) => {
  const newCampaign = new Campaign({
    title: req.body.title,
    goal: req.body.goal,
    description: req.body.description,
    category: req.body.category,
    deadline: req.body.deadline,
    // We're assuming a user is logged in here
    // If they aren't, this will throw an error
    _creator: req.user._id
  });

  newCampaign.save(err => {
    if (err) {
      res.render("campaigns/new", { campaign: newCampaign, types: TYPES });
    } else {
      res.redirect(`/campaigns/${newCampaign._id}`);
    }
  });
});

module.exports = router;
