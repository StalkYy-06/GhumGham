const db = require("../config/db");

(async () => {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS destinations (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                location VARCHAR(255) NOT NULL,
                description TEXT,
                image_url VARCHAR(255)
            )
        `);
        console.log("Destinations table created or already exists");
    } catch (err) {
        console.error("Error creating Destinations table:", err.message);
    }
})();

module.exports = db;