// src/controllers/contactController.js

const db = require("../config/db");

exports.submitContactForm = (req, res) => {
  const { name, email, message } = req.body;

  const query = "INSERT INTO contact (name, email, message) VALUES (?, ?, ?)";

  db.query(query, [name, email, message], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    res.status(200).json({ message: "Contact form submitted successfully" });
  });
};
