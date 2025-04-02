import React from 'react';
import { FaInstagram, FaFacebook, FaXTwitter } from 'react-icons/fa6';
import { MdLocationOn, MdPhone, MdEmail } from 'react-icons/md';
import './Headerstyles.css'; // Import the CSS file

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          {/* Follow Us Section */}
          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="footer-icons">
              <FaInstagram className="footer-icon" />
              <FaFacebook className="footer-icon" />
              <FaXTwitter className="footer-icon" />
            </div>
          </div>
          {/* Logo */}
          <div className="footer-logo">
            <img src="/ghumnajam-logo.png" alt="Ghumnajam Logo" />
          </div>
          {/* Contact Us Section */}
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
