const express = require("express");
const passport = require("passport");
const router = express.Router();

// Google
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback", passport.authenticate("google", {
  failureRedirect: "/login",
  successRedirect: "/dashboard",
}));

// GitHub
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));

router.get("/github/callback", passport.authenticate("github", {
  failureRedirect: "/login",
  successRedirect: "/dashboard",
}));

module.exports = router;
