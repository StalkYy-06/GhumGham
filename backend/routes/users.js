const express = require("express");
const router = express.Router();
const db = require("../config/db");
const multer = require('multer');
const path = require('path');

// Promise-based query helper
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
    return res.status(401).json({ error: "Not authenticated" });
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.get("/", async (req, res) => {
    try {
        const results = await query("SELECT id, name, email ,role FROM users");
        res.json({ user: results });
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ error: "Database error" });
    }
});

router.get("/profile", isAuthenticated, async (req, res) => {
    try {
        const userId = req.session.user.id;
        const results = await query(
            "SELECT id, name, email, bio, avatar_url, role FROM users WHERE id = ?",
            [userId]
        );

        if (results.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ user: results[0] });
    } catch (err) {
        console.error("Error fetching user profile:", err);
        res.status(500).json({ error: "Database error" });
    }
});

router.get("/:id", async (req, res) => {
    const userId = req.params.id;
    try {
        const results = await query("SELECT id, name, email FROM users WHERE id = ?", [userId]);
        if (results.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(results[0]);
    } catch (err) {
        console.error("Error fetching user:", err);
        res.status(500).json({ error: "Database error" });
    }
});

router.put("/update", isAuthenticated, async (req, res) => {
    const { name, email, bio } = req.body;
    const userId = req.session.user.id;

    if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required" });
    }

    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
    }

    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        const existingUser = await query("SELECT * FROM users WHERE email = ? AND id != ?", [email, userId]);
        if (existingUser.length > 0) {
            await connection.rollback();
            connection.release();
            return res.status(400).json({ error: "Email already in use" });
        }

        await connection.query(
            "UPDATE users SET name = ?, email = ?, bio = ? WHERE id = ?",
            [name, email, bio || null, userId]
        );

        req.session.user = {
            ...req.session.user,
            name,
            email
        };

        await connection.commit();
        res.json({
            message: "Profile updated successfully",
            user: {
                id: userId,
                name,
                email,
                bio: bio || null
            }
        });
    } catch (error) {
        await connection.rollback();
        console.error("Profile update error:", error);
        res.status(500).json({ error: "Server error" });
    } finally {
        connection.release();
    }
});

router.delete("/delete", isAuthenticated, async (req, res) => {
    const userId = req.session.user.id;
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();
        await connection.query("DELETE FROM users WHERE id = ?", [userId]);
        await connection.commit();
        req.session.destroy();
        res.json({ message: "Profile deleted successfully" });
    } catch (error) {
        await connection.rollback();
        console.error("Profile delete error:", error);
        res.status(500).json({ error: "Server error" });
    } finally {
        connection.release();
    }
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname).toLowerCase();
        cb(null, uniqueSuffix + ext);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only JPEG, PNG, and GIF images are allowed'), false);
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: fileFilter
});

router.post("/upload-avatar", isAuthenticated, upload.single('avatar'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    const avatarUrl = `/uploads/${req.file.filename}`;
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();
        await connection.query(
            "UPDATE users SET avatar_url = ? WHERE id = ?",
            [avatarUrl, req.session.user.id]
        );

        req.session.user = {
            ...req.session.user,
            avatar_url: avatarUrl
        };

        await connection.commit();
        res.json({ avatar_url: avatarUrl });
    } catch (err) {
        await connection.rollback();
        console.error("Avatar upload error:", err);
        res.status(500).json({ error: "Server error" });
    } finally {
        connection.release();
    }
});

module.exports = router;