import React from 'react';
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
                                <img src='/insta.png' alt='instagram logo' className='logo_ig' />
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                <img src='/facebook.png' alt='facebook logo' className='logo_fb' />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                <img src='/twitter.png' alt='twitter logo' className='logo_X' />
                            </a>
                        </div>
                    </div>

                    <div className="footer-section contact-info">
                        <h3>Contact Us</h3>
                        <p> 123 Street, Naxal, Kathmandu</p>
                        <p> +977 9866657981</p>
                        <p> ghumnajam2025@gmail.com</p>
                    </div>
                </div>
                <div className="footer-bottom">© 2025 Ghumnajam LLC. All rights reserved.</div>
            </div>
        </footer>
    );
}

export default Footer;
