require("./config/user");
require("dotenv").config();
require("./config/password_reset");

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const winston = require("winston");
const db = require("./config/db");
const sessionStore = require("./config/sessionStore");
const path = require("path");

require("./config/passport");

const app = express();
const PORT = process.env.PORT || 5000;

const logger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  transports: [new winston.transports.File({ filename: 'error.log' })],
});

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
    store: sessionStore,
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
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Routes
app.get("/", (req, res) => {
  res.send("GhumGham Backend Running");
});

// Modular Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/destinations", require("./routes/destinations"));
app.use("/api/profiles", require("./routes/profiles"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/comments", require("./routes/comments"));
app.use("/api/booking", require("./routes/booking"));

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

// Error Handler
app.use((err, req, res, next) => {
  logger.error(`${err.message} - ${req.method} ${req.url}`);
  res.status(500).json({ error: "Server error" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});