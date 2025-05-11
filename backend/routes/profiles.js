const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Helper function for Promise-based queries
const query = async (sql, params) => {
    try {
        const [results] = await db.query(sql, params);
        return results;
    } catch (err) {
        throw err;
    }
};

// Custom middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    }
    console.error("Unauthorized access to /api/profiles: User not authenticated");
    return res.status(401).json({ error: "Not authenticated" });
};

router.get("/", isAuthenticated, async (req, res) => {
    try {
        const results = await query(
            "SELECT id, name, email, bio, avatar_url FROM users WHERE id = ?",
            [req.session.user.id]
        );

        if (results.length === 0) {
            console.error("User not found for ID:", req.session.user.id);
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ user: results[0] });
    } catch (err) {
        console.error("Database error fetching profile:", err);
        res.status(500).json({ error: "Database error" });
    }
});

module.exports = router;