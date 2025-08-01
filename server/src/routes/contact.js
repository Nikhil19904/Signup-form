const express = require("express");
const router = express.Router();
const db = require("../config/db");

// 🧩 Import middleware
const validateContact = require("../middlewares/validateContact");
const contactController = require("../controllers/contactController");

// 🛡 Apply middleware
router.post("/", validateContact, (req, res) => {
  const { name, email, message } = req.body;

  const query = "INSERT INTO contact (name, email, message) VALUES (?, ?, ?)";
  db.query(query, [name, email, message], (err, result) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    res.status(200).json({ message: "Contact form submitted successfully" });
  });
});

module.exports = router;
