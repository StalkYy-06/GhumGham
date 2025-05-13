const db = require("../config/db");

(async () => {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS comments (
                id INT AUTO_INCREMENT PRIMARY KEY,
                type ENUM('itinerary', 'blog') NOT NULL,
                item_id INT NOT NULL,
                user_id INT NOT NULL,
                user_name VARCHAR(255) NOT NULL,
                content TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id),
                INDEX idx_type_item (type, item_id)
            )
        `);
        console.log("Comments table created or already exists");
    } catch (err) {
        console.error("Error creating Comments table:", err.message);
    }
})();

module.exports = db;