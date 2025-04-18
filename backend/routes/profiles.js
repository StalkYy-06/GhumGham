const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/", (req, res) => {
    if (!req.isAuthenticated()) {
        console.error("Unauthorized access to /api/profiles: User not authenticated");
        return res.status(401).json({ error: "Not authenticated" });
    }

    db.query("SELECT id, name, email, bio, avatar_url FROM users WHERE id = ?", [req.user.id], (err, results) => {
        if (err) {
            console.error("Database error fetching profile:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if (results.length === 0) {
            console.error("User not found for ID:", req.user.id);
            return res.status(404).json({ error: "User not found" });
        }
        res.json({ user: results[0] });
    });
});

module.exports = router;