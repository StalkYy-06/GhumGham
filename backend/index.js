require("dotenv").config();
const express = require("express");
const cors = require("cors")
const db = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Root Route
app.get("/", (req, res) => {
  res.send("Test Passes!!!");
});

// Example: Fetch all users from 'users' table
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Database query failed");
    } else {
      res.json(results);
    }
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
