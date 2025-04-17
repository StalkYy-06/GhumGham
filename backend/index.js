const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");

require("./config/passport");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Root Route
app.get("/", (req, res) => {
  res.send("");
});

db.connect(err => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("MySQL Database Connected");
  }
});

// Simple Route
app.get("/", (req, res) => {
  res.send("Stalkyy Testes!!!");
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
