const db = require("../config/db");

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
        console.log("Password Reset Tokens table created or already exists");
    } catch (err) {
        console.error("Error creating Password Reset Tokens table:", err.message);
    }
})();

module.exports = db;