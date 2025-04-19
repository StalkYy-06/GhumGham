const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
require("dotenv").config();

const query = (sql, params) => {
    return new Promise((resolve, reject) => {
        db.query(sql, params, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validatePassword = (password) => {
    if (password.length < 8) return "Password must be at least 8 characters";
    if (!/[A-Z]/.test(password)) return "Password must contain an uppercase letter";
    if (!/[a-z]/.test(password)) return "Password must contain a lowercase letter";
    if (!/[0-9]/.test(password)) return "Password must contain a number";
    if (!/[!@#$%^&*]/.test(password)) return "Password must contain a special character";
    return null;
};

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

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
        return res.status(400).json({ error: passwordError });
    }

    try {
        const existingUser = await query("SELECT * FROM users WHERE email = ? OR name = ?", [email, name]);
        if (existingUser.length > 0) {
            return res.status(400).json({
                error: existingUser[0].email === email ? "Email already registered" : "Username taken"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await query(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            [name, email, hashedPassword]
        );

        req.session.user = { name, email };
        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const results = await query("SELECT * FROM users WHERE email = ?", [email]);
        if (results.length === 0) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const user = results[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        req.session.user = { id: user.id, name: user.name, email: user.email };
        res.json({ message: "Login successful", user: { name: user.name, email: user.email } });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

router.post("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error("Logout error:", err);
            return res.status(500).json({ error: "Logout failed" });
        }
        res.json({ message: "Logged out successfully" });
    });
});

router.post("/forgot-password", async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
    }

    try {
        if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.FRONTEND_URL) {
            console.error("Missing environment variables");
            throw new Error("Email configuration is incomplete");
        }

        const users = await query("SELECT * FROM users WHERE email = ?", [email]);
        if (users.length === 0) {
            return res.status(404).json({ error: "No user found with this email" });
        }

        const token = crypto.randomBytes(32).toString("hex");
        const expiresAt = new Date(Date.now() + 3600000);

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

router.post("/reset-password", async (req, res) => {
    const { email, token, password, confirmPassword } = req.body;

    if (!email || !token || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
        return res.status(400).json({ error: passwordError });
    }

    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        const tokens = await query(
            "SELECT * FROM password_reset_tokens WHERE email = ? AND token = ? AND expires_at > NOW()",
            [email, token]
        );

        if (tokens.length === 0) {
            return res.status(400).json({ error: "Invalid or expired token" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await connection.query("UPDATE users SET password = ? WHERE email = ?", [hashedPassword, email]);
        await connection.query("DELETE FROM password_reset_tokens WHERE email = ? AND token = ?", [email, token]);

        await connection.commit();
        res.json({ message: "Password reset successfully" });
    } catch (error) {
        await connection.rollback();
        console.error("Reset password error:", error);
        res.status(500).json({ error: "Server error" });
    } finally {
        connection.release();
    }
});

module.exports = router;