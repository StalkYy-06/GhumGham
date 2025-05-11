const db = require("../config/db");

(async () => {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS sessions (
                session_id VARCHAR(255) PRIMARY KEY,
                expires BIGINT NOT NULL,
                data TEXT
            )
        `);
        console.log("Sessions table created or already exists");
    } catch (err) {
        console.error("Error creating Sessions table:", err.message);
    }
})();

module.exports = db;