const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Get all destinations
router.get("/", (req, res) => {
    db.query("SELECT * FROM destinations", (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Add a new destination
router.post("/add", (req, res) => {
    const { name, location, description, image_url } = req.body;
    db.query("INSERT INTO destinations (name, location, description, image_url) VALUES (?, ?, ?, ?)", 
        [name, location, description, image_url], 
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: "Destination added successfully!" });
        }
    );
});

module.exports = router;
