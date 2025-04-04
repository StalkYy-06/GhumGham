const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcrypt");

console.log("Users route loaded");

// Email and Password validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const noSpaces = !/\s/.test(password);

    if (password.length < minLength) {
        return "Password must be at least 8 characters long";
    }
    if (!hasUpperCase) {
        return "Password must include at least one uppercase letter";
    }
    if (!hasLowerCase) {
        return "Password must include at least one lowercase letter";
    }
    if (!hasDigit) {
        return "Password must include at least one number";
    }
    if (!noSpaces) {
        return "Password cannot contain spaces";
    }
    return null; // Password is valid
};

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

    // Validate email format
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid Email" });
    }

    // Validate password format
    const passwordError = validatePassword(password);
    if (passwordError) {
        return res.status(400).json({ error: passwordError });
    }

    try {

        //Checking for Username
        db.query("SELECT * FROM users WHERE name=?", [name], async (err, results) => {
            if (err) {
                return res.status(500).json({ error: "Database error" });
            }

            if (results.length > 0) {
                return res.status(400).json({ error: "Username Already Exists" });
            }
        });

        //Checking for email
        db.query("SELECT * FROM users WHERE email=?", [email], async (err, results) => {
            if (err) {
                return res.status(500).json({ error: "Database error" });
            }

            if (results.length > 0) {
                return res.status(400).json({ error: "Email Already Registered" });
            }
        });


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

//login new user
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

module.exports = router;
