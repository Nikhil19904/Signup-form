const express = require("express");
const passport = require("passport");
const session = require("express-session");
const authRoutes = require("./routes/auth");
require("dotenv").config();
require("./config/passport");

const app = express();

app.use(session({ secret: "secret123", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);

// Optional: Add route to get current user
app.get("/api/user", (req, res) => {
  if (req.user) res.json(req.user);
  else res.status(401).json({ message: "Not authenticated" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
