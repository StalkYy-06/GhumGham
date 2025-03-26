const express = require("express");
const router = express.Router();

// Profile Route (Protected)
router.get("/", (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ user: req.user });
    } else {
        res.status(401).send("Not authenticated");
    }
});

module.exports = router;