const express = require("express");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Simple Route
app.get("/", (req, res) => {
  res.send("Stalkyy Testes!!!");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});