const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
require("dotenv").config();

// Get all users
router.get("/", (req, res) => {
    db.query("SELECT id, name, email FROM users", (err, results) => {
        if (err) {
            console.error("Error fetching users:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json(results);
    });
});

// Promisify db.query
const query = (sql, params) => {
    return new Promise((resolve, reject) => {
        db.query(sql, params, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

// Email transporter setup
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        minVersion: "TLSv1.2",
        rejectUnauthorized: true,
    },
});

// Register a new user
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    // Check for missing fields
    if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        // Hash the password before storing
        const hashedPassword = await bcrypt.hash(password, 10);

        db.query(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            [name, email, hashedPassword],
            (err, results) => {
                if (err) {
                    console.error("Error registering user:", err);
                    return res.status(500).json({ error: "Registration failed" });
                }
                res.status(201).json({ message: "User registered successfully!" });
            }
        );
    } catch (error) {
        console.error("Hashing error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

//login user
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    //Query the database to find the user by email
    db.query("SELECT * FROM users Where email=?", [email], async (err, results) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({ error: "Database error" });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: "Invalid Email or Password" });
        }

        const user = results[0];

        //check password within the database
        try {
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return res.status(401).json({ error: "Invalid email or password" });
            }

            //Store user in session on successful login 
            req.session.user = { id: user.id, name: user.name, email: user.email };
            res.json({ message: "Login successful" });
        } catch (error) {
            console.error("Password comparison error:", error);
            res.status(500).json({ error: "Server Error" });
        }

    });
});

// Get a single user by ID
router.get("/:id", (req, res) => {
    const userId = req.params.id;
    db.query("SELECT id, name, email FROM users WHERE id = ?", [userId], (err, results) => {
        if (err) {
            console.error("Error fetching user:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(results[0]);
    });
});

// Forgot Password
router.post("/forgot-password", async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
    }

    try {
        // Verify environment variables
        if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.FRONTEND_URL) {
            console.error("Missing environment variables:", {
                EMAIL_HOST: !!process.env.EMAIL_HOST,
                EMAIL_USER: !!process.env.EMAIL_USER,
                EMAIL_PASS: !!process.env.EMAIL_PASS,
                FRONTEND_URL: !!process.env.FRONTEND_URL,
            });
            throw new Error("Email configuration is incomplete");
        }

        const users = await query("SELECT * FROM users WHERE email = ?", [email]);
        if (users.length === 0) {
            return res.status(404).json({ error: "No user found with this email" });
        }

        const token = crypto.randomBytes(32).toString("hex");
        const expiresAt = new Date(Date.now() + 3600000); // 1 hour expiry

        await query(
            "INSERT INTO password_reset_tokens (email, token, expires_at) VALUES (?, ?, ?)",
            [email, token, expiresAt]
        );

        const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}&email=${encodeURIComponent(email)}`;
        await transporter.sendMail({
            from: `"Ghumnajam" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Ghumnajam Password Reset",
            html: `
          <p>You requested a password reset for your Ghumnajam account.</p>
          <p>Click <a href="${resetUrl}">here</a> to reset your password.</p>
          <p>This link expires in 1 hour.</p>
        `,
        });

        res.json({ message: "Password reset email sent" });
    } catch (error) {
        console.error("Forgot password error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// Reset Password
router.post("/reset-password", async (req, res) => {
    const { email, token, password, confirmPassword } = req.body;

    if (!email || !token || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ error: "Password do not match" })
    }
    const passwordError = validatePassword(password);
    if (passwordError) {
        return res.status(400).json({ error: passwordError });
    }

    try {
        const tokens = await query(
            "SELECT * FROM password_reset_tokens WHERE email = ? AND token = ? AND expires_at > NOW()",
            [email, token]
        );

        if (tokens.length === 0) {
            return res.status(400).json({ error: "Invalid or expired token" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await query("UPDATE users SET password = ? WHERE email = ?", [hashedPassword, email]);
        await query("DELETE FROM password_reset_tokens WHERE email = ? AND token = ?", [email, token]);

        res.json({ message: "Password reset successfully" });
    } catch (error) {
        console.error("Reset password error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
