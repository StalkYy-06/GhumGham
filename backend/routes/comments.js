// routes/comments.js
const express = require('express');
const router = express.Router();
const db = require('../config/db')
const Comment = require('../models/comments');
// const User = require('../models/User');

// Custom middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    console.log('Session:', req.session);
    console.log('Session user:', req.session?.user);
    if (req.session && req.session.user) {
        return next();
    }
    console.error("Unauthorized access to /api/comments: User not authenticated");
    return res.status(401).json({ error: "Authentication required. Please log in." });
};

// Get Comments for a specific Itinerary
router.get('/:itineraryId', async (req, res) => {
    const itineraryId = req.params.itineraryId;
    try {
        const [comments] = await db.query(`
            SELECT c.*, u.id AS userId, u.name AS userName, u.avatar_url AS avatarUrl
            FROM comments c 
            JOIN users u ON c.user_id = u.id
            WHERE c.itinerary_id = ? AND c.parent_comment_id IS NULL
            ORDER BY c.created_at DESC
        `, [itineraryId]);
        for (const comment of comments) {
            const [replies] = await db.query(`
                SELECT r.*, u.id AS userId, u.name AS userName, u.avatar_url AS avatarUrl
                FROM comments r
                JOIN users u ON r.user_id = u.id
                WHERE r.parent_comment_id = ?
                ORDER BY r.created_at ASC
            `, [comment.id]);
            comment.replies = replies;
        }
        res.json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// Create a Comment
router.post('/', isAuthenticated, async (req, res) => {
    const { itineraryId, text, parentCommentId } = req.body;
    const userId = req.session.user.id;
    try {
        const [result] = await db.query(`
            INSERT INTO comments (itinerary_id, user_id, text, parent_comment_id)
            VALUES (?, ?, ?, ?)
        `, [itineraryId, userId, text, parentCommentId || null]);
        const commentId = result.insertId;
        const [rows] = await db.query(`
            SELECT c.*, u.id AS userId, u.name AS userName, u.avatar_url AS avatarUrl
            FROM comments c
            JOIN users u ON c.user_id = u.id
            WHERE c.id = ?
        `, [commentId]);
        res.status(201).json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// Update a Comment
router.put('/:id', isAuthenticated, async (req, res) => {
    const commentId = req.params.id;
    const { text } = req.body;
    const userId = req.session.user.id;
    try {
        const [rows] = await db.query(`SELECT * FROM comments WHERE id = ?`, [commentId]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        const comment = rows[0];
        if (comment.user_id !== userId) {
            return res.status(403).json({ message: 'Not authorized to edit this comment' });
        }
        await db.query(`UPDATE comments SET text = ? WHERE id = ?`, [text, commentId]);
        const [updated] = await db.query(`
            SELECT c.*, u.id AS userId, u.name AS userName, u.avatar_url AS avatarUrl
            FROM comments c
            JOIN users u ON c.user_id = u.id
            WHERE c.id = ?
        `, [commentId]);
        res.json(updated[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// Delete a Comment
router.delete('/:id', isAuthenticated, async (req, res) => {
    const commentId = req.params.id;
    const userId = req.session.user.id;

    try {
        const [rows] = await db.query(`SELECT * FROM comments WHERE id = ?`, [commentId]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        const comment = rows[0];

        if (comment.user_id !== userId) {
            return res.status(403).json({ message: 'Not authorized to delete this comment' });
        }

        await db.query(`
            DELETE FROM comments 
            WHERE id = ? OR parent_comment_id = ?
        `, [commentId, commentId]);

        res.json({ message: 'Comment deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

module.exports = router;
