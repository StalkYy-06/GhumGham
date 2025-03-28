const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcrypt");

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

module.exports = router;
