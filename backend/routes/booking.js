const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] isAuthenticated middleware - Session:`, req.session);
    console.log(`[${new Date().toISOString()}] isAuthenticated middleware - User:`, req.session ? req.session.user : 'No session');
    if (!req.session || !req.session.user) {
        return res.status(401).json({ error: 'Not authenticated. Please log in.' });
    }
    next();
};

// GET booking details (all for admins, user-specific for regular users)
router.get('/details', isAuthenticated, async (req, res) => {
    console.log(`[${new Date().toISOString()}] GET /booking-details - Fetching booking details`);
    console.log(`[${new Date().toISOString()}] User:`, req.session.user);

    try {
        let query = '';
        let params = [];

        if (req.session.user.role === 'admin') {
            query = `
                SELECT 
                    b.id, 
                    b.name, 
                    b.booked_date, 
                    b.trip_name, 
                    b.trip_cost, 
                    b.trip_estimated_days, 
                    b.user_id, 
                    b.destination_id, 
                    u.email AS user_email 
                FROM booking b 
                JOIN users u ON b.user_id = u.id
            `;
        } else {
            query = `
                SELECT 
                    b.id, 
                    b.name, 
                    b.booked_date, 
                    b.trip_name, 
                    b.trip_cost, 
                    b.trip_estimated_days, 
                    b.user_id, 
                    b.destination_id 
                FROM booking b 
                WHERE b.user_id = ?
            `;
            params = [req.session.user.id];
        }

        console.log(`[${new Date().toISOString()}] Executing query:`, query, 'with params:', params);
        const [rows] = await db.query(query, params);
        console.log(`[${new Date().toISOString()}] Bookings fetched:`, rows);
        res.json(rows);
    } catch (err) {
        console.error(`[${new Date().toISOString()}] Error fetching bookings:`, err.stack);
        res.status(500).json({ error: 'Server error', details: err.message });
    }
});

// POST to create a new booking
router.post('/create', isAuthenticated, async (req, res) => {
    console.log(`[${new Date().toISOString()}] POST /create-booking - Creating new booking`);
    console.log(`[${new Date().toISOString()}] Request body:`, req.body);
    console.log(`[${new Date().toISOString()}] User:`, req.session.user);

    const { destination_id, booked_date } = req.body;
    const user_id = req.session.user.id;

    try {
        // Verify destination exists
        const [destRows] = await db.query(
            'SELECT destinations_name, cost_estimate, total_days FROM destinations WHERE destinations_id = ?',
            [destination_id]
        );
        console.log(`[${new Date().toISOString()}] Destination query result:`, destRows);
        if (destRows.length === 0) {
            return res.status(404).json({ error: 'Destination not found' });
        }

        const { destinations_name, cost_estimate, total_days } = destRows[0];
        const formattedDate = new Date(booked_date).toISOString().split('T')[0];

        // Insert booking
        const [result] = await db.query(
            `INSERT INTO booking (name, booked_date, trip_name, trip_cost, trip_estimated_days, user_id, destination_id)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                req.session.user.name,
                formattedDate,
                destinations_name,
                cost_estimate,
                total_days,
                user_id,
                destination_id
            ]
        );
        console.log(`[${new Date().toISOString()}] Booking created with ID:`, result.insertId);

        res.status(201).json({
            message: 'Booking created successfully',
            booking_id: result.insertId
        });
    } catch (err) {
        console.error(`[${new Date().toISOString()}] Error creating booking:`, err.stack);
        res.status(500).json({ error: 'Server error', details: err.message, sqlMessage: err.sqlMessage });
    }
});

// DELETE a booking by ID
router.delete('/remove/:id', isAuthenticated, async (req, res) => {
    console.log(`[${new Date().toISOString()}] DELETE /remove-booking/:id - Removing booking with ID: ${req.params.id}`);
    console.log(`[${new Date().toISOString()}] User:`, req.session.user);

    const { id } = req.params;

    try {
        const [rows] = await db.query('SELECT * FROM booking WHERE id = ?', [id]);
        console.log(`[${new Date().toISOString()}] Booking query result:`, rows);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        if (req.session.user.role !== 'admin' && rows[0].user_id !== req.session.user.id) {
            return res.status(403).json({ error: 'Access denied. You can only cancel your own bookings.' });
        }

        await db.query('DELETE FROM booking WHERE id = ?', [id]);
        console.log(`[${new Date().toISOString()}] Booking deleted successfully`);
        res.json({ message: 'Booking cancelled successfully' });
    } catch (err) {
        console.error(`[${new Date().toISOString()}] Error cancelling booking:`, err.stack);
        res.status(500).json({ error: 'Server error', details: err.message });
    }
});

module.exports = router;