const db = require('./db');

(async () => {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS password_reset_tokens (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(100) NOT NULL,
                token VARCHAR(255) NOT NULL,
                expires_at DATETIME NOT NULL,
                FOREIGN KEY (email) REFERENCES users(email) ON DELETE CASCADE
                )
        `);
        console.log('password_reset_tokens table created or already exists');
    } catch (err) {
        console.error('Error creating password_reset_tokens table:', err.message);
    }
})();