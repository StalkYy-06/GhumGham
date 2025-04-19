const MySQLStore = require("express-mysql-session")(require("express-session"));
const db = require("../config/db");
require("dotenv").config();

const createSessionStore = () => {
    try {
        const sessionStore = new MySQLStore({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT || 3306,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            clearExpired: true,
            checkExpirationInterval: 900000, // 15 minutes
            expiration: 24 * 60 * 60 * 1000, // 1 day
        }, db);

        console.log("MySQL session store initialized successfully");
        return sessionStore;
    } catch (error) {
        console.error("Failed to initialize MySQL session store:", error);
        throw new Error("Session store initialization failed");
    }
};

module.exports = createSessionStore();