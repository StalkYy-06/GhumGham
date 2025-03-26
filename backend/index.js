const express = require("express");
const mysql = require("mysql2");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// MySQL Database Connection
const db = mysql.createConnection({
  host: "localhost",     // Change if using a remote DB
  user: "root",          // Your MySQL username
  password: "", // Your MySQL password
  database: "ghumnajamdb" // Your database name
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
