import React from 'react';
import { FaInstagram, FaFacebook, FaXTwitter } from 'react-icons/fa6';
import { MdLocationOn, MdPhone, MdEmail } from 'react-icons/md';
import './footerstyles.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-top">
                    <div className="footer-section">
                        <h3>Follow Us</h3>
                        <div className="footer-icons">
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                <FaInstagram className="footer-icon" />
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                <FaFacebook className="footer-icon" />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                <FaXTwitter className="footer-icon" />
                            </a>
                        </div>
                    </div>
                    <div className="footer-logo">
                        <img src="/ghumnajam-logo.png" alt="Ghumnajam Logo" />
                    </div>
                    <div className="footer-section contact-info">
                        <h3>Contact Us</h3>
                        <p><MdLocationOn className="footer-icon" /> 123 Street, Naxal, Kathmandu</p>
                        <p><MdPhone className="footer-icon" /> +977 9866657981</p>
                        <p><MdEmail className="footer-icon" /> ghumnaJam25@gmail.com</p>
                    </div>
                </div>
                <div className="footer-bottom">© 2025 Ghumnajam LLC. All rights reserved.</div>
            </div>
        </footer>
    );
}

export default Footer;
