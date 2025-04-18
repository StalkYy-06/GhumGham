const db = require('./db');

db.query(
    `CREATE TABLE IF NOT EXISTS password_reset_tokens (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(100) NOT NULL,
        token VARCHAR(255) NOT NULL,
        expires_at DATETIME NOT NULL
    )`,
    (err) => {
        if (err) console.error('Error creating password_reset_tokens table:', err.message);
    }
);

module.exports = db;