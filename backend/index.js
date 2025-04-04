require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const db = require("./config/db");
const passport = require("passport");

require("./config/passport");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Root Route
app.get("/", (req, res) => {
  res.send("Test Passes!!!");
});

//Modular Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/destinations", require(("./routes/destinations")));
app.use("/api/profile", require(("./routes/profiles")));

//Passport authentication Routes
app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("http://localhost:3000/");
  }
);

// Catch-all for debugging
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
