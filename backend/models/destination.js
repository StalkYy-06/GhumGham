const db = require("../config/db");

(async () => {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS destinations (
                destinations_id INT AUTO_INCREMENT PRIMARY KEY,
                destinations_name VARCHAR(100) NOT NULL UNIQUE,
                description_short VARCHAR(200) NOT NULL,
                description_long TEXT NOT NULL,
                total_days INT NOT NULL CHECK (total_days > 0),
                destinations_photo VARCHAR(255) NOT NULL,
                cost_estimate VARCHAR(200) NOT NULL,
                tour_type ENUM('camp', 'teahouse', 'motorways', 'trekking', 'sightseeing') NOT NULL,
                difficulty_level ENUM('easy', 'moderate', 'hard', 'expert') NOT NULL,
                best_season VARCHAR(50) NOT NULL,
                max_altitude INT CHECK (max_altitude >= 0),
                availability BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);
        console.log("Destinations table created or already exists");
    } catch (err) {
        console.error("Error creating Destinations table:", err.message);
    }
})();

module.exports = db;