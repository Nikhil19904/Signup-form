// server/index.js
const express = require("express");
const cors = require("cors");

const contactRoute = require("./routes/contact");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/contact", contactRoute);

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
