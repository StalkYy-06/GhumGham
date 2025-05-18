const express = require('express');
const router = express.Router();
const db = require('../config/db')
const multer = require('multer');
const path = require('path');

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/destinations/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error('Images only (jpeg, jpg, png)!'));
        }
    },
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Admin authentication middleware
const adminAuth = (req, res, next) => {
    if (!req.session || !req.session.user || req.session.user.role !== 'admin') {
        return res.status(403).json({ error: 'Access denied. Admin role required.' });
    }
    next();
};

// GET all destinations (public access)
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM destinations');
        res.json(rows);
    } catch (err) {
        console.error('Error fetching destinations:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// GET single destination by ID (public access)
router.get('/:id', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM destinations WHERE destinations_id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Destination not found' });
        }
        res.json(rows[0]);
    } catch (err) {
        console.error('Error fetching destination:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// POST new destination (admin only)
router.post('/add', upload.single('destinations_photo'), async (req, res) => {
    // Check if user is authenticated
    console.log('Session:', req.session); // Debug: Log session
    console.log('User:', req.session.user); // Debug: Log user
    if (!req.session.user) {
        return res.status(401).json({ error: 'Not authenticated' });
    }

    // Check if user is admin
    if (req.session.user.role !== 'admin') {
        console.log('User role:', req.session.user.role); // Debug: Log role
        return res.status(403).json({ error: 'Admin access required' });
    }

    const {
        destinations_name, description_short, description_long, total_days, cost_estimate,
        tour_type, difficulty_level, best_season, max_altitude, availability, latitude, longitude
    } = req.body;

    if (!req.file) {
        return res.status(400).json({ error: 'Destination photo is required' });
    }

    const destinations_photo = `/uploads/destinations/${req.file.filename}`;

    try {
        const [result] = await db.query(
            `INSERT INTO destinations (
                destinations_name, description_short, description_long, total_days, destinations_photo,
                cost_estimate, tour_type, difficulty_level, best_season, max_altitude, availability,
                latitude, longitude
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                destinations_name, description_short, description_long, total_days, destinations_photo,
                cost_estimate, tour_type, difficulty_level, best_season, max_altitude || null,
                availability === 'true' ? 1 : 0, latitude || null, longitude || null
            ]
        );
        res.status(201).json({ message: 'Destination added successfully', destinations_id: result.insertId });
    } catch (err) {
        console.error('Error adding destination:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

//Edit destinations
router.put('/update/:id', upload.single('destinations_photo'), async (req, res) => {
    const { id } = req.params;
    const {
        destinations_name, description_short, description_long, total_days, cost_estimate,
        tour_type, difficulty_level, best_season, max_altitude, availability, latitude, longitude
    } = req.body;

    // Check if user is authenticated
    console.log('Session:', req.session); // Debug: Log session
    console.log('User:', req.session.user); // Debug: Log user
    if (!req.session.user) {
        return res.status(401).json({ error: 'Not authenticated' });
    }

    // Check if user is admin
    if (req.session.user.role !== 'admin') {
        console.log('User role:', req.session.user.role); // Debug: Log role
        return res.status(403).json({ error: 'Admin access required' });
    }

    try {
        const [rows] = await db.query('SELECT * FROM destinations WHERE destinations_id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Destination not found' });
        }

        const updates = {
            destinations_name,
            description_short,
            description_long,
            total_days,
            cost_estimate,
            tour_type,
            difficulty_level,
            best_season,
            max_altitude: max_altitude || null,
            availability: availability === 'true' ? 1 : 0,
            latitude: latitude || null,
            longitude: longitude || null
        };

        if (req.file) {
            updates.destinations_photo = `/uploads/destinations/${req.file.filename}`;
        }

        await db.query(
            `UPDATE destinations SET
                destinations_name = ?, description_short = ?, description_long = ?, total_days = ?,
                destinations_photo = COALESCE(?, destinations_photo), cost_estimate = ?, tour_type = ?,
                difficulty_level = ?, best_season = ?, max_altitude = ?, availability = ?,
                latitude = ?, longitude = ?
            WHERE destinations_id = ?`,
            [
                updates.destinations_name, updates.description_short, updates.description_long,
                updates.total_days, updates.destinations_photo, updates.cost_estimate,
                updates.tour_type, updates.difficulty_level, updates.best_season,
                updates.max_altitude, updates.availability, updates.latitude, updates.longitude, id
            ]
        );
        res.json({ message: 'Destination updated successfully' });
    } catch (err) {
        console.error('Error updating destination:', err);
        res.status(500).json({ error: 'Server error' });
    }
});


// DELETE destination (admin only)
router.delete('/:id', adminAuth, async (req, res) => {
    const { id } = req.params;

    // Debug: Log session and user details to verify middleware
    console.log('Session:', req.session);
    console.log('User:', req.session.user);
    console.log('User role:', req.session.user ? req.session.user.role : 'undefined');

    try {
        const [rows] = await db.query('SELECT * FROM destinations WHERE destinations_id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Destination not found' });
        }

        await db.query('DELETE FROM destinations WHERE destinations_id = ?', [id]);
        res.json({ message: 'Destination deleted successfully' });
    } catch (err) {
        console.error('Error deleting destination:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;