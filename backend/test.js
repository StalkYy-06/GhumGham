// backend/test-email.js
require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_PORT === "465",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

async function sendTestEmail() {
    try {
        const info = await transporter.sendMail({
            from: `"GhumGham" <${process.env.EMAIL_USER}>`,
            to: "swarnimrai220@gmail.com", // Replace with a real email you can check
            subject: "Test Email from GhumGham",
            html: "<p>This is a test email.</p>",
        });
        console.log("Email sent:", info.messageId);
    } catch (error) {
        console.error("Email error:", error);
    }
}

sendTestEmail();