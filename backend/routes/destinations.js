const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Get all destinations
router.get("/", async (req, res) => {
    try {
        const [results] = await db.query("SELECT * FROM destinations");
        res.json(results);
    } catch (err) {
        console.error("Error fetching destinations:", err);
        res.status(500).json({ error: err.message });
    }
});

// Add a new destination
router.post("/add", async (req, res) => {
    const { name, location, description, image_url } = req.body;
    try {
        await db.query(
            "INSERT INTO destinations (name, location, description, image_url) VALUES (?, ?, ?, ?)",
            [name, location, description, image_url]
        );
        res.json({ message: "Destination added successfully!" });
    } catch (err) {
        console.error("Error adding destination:", err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;