require("./config/user");
require("dotenv").config();
require("./config/password_reset");

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const db = require("./config/db");

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
    secret: process.env.SESSION_SECRET || "your_session_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Serve static files for uploads
app.use('/uploads', express.static('./public/uploads'));

// Database Connection
db.connect(err => {
  if (err) {
    console.error("Database connection failed:", err);
    process.exit(1);
  } else {
    console.log("MySQL Database Connected");
  }
});

// Routes
app.get("/", (req, res) => {
  res.send("GhumGham Backend Running");
});

// Modular Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/destinations", require("./routes/destinations"));
app.use("/api/profiles", require("./routes/profiles"));

// Google OAuth Routes
app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("http://localhost:3000/");
  }
);

// 404 Handler
app.use((req, res) => {
  console.log(`Route not found: ${req.method} ${req.url}`);
  res.status(404).json({ error: "Route not found" });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ error: "Server error" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});