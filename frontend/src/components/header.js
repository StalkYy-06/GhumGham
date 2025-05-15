import React, { useContext } from "react";
import { Link } from "react-router-dom"; // For navigation
import { AuthContext } from "../context/AuthContext"; // Importing authentication context
import './headerstyles.css'; // Importing related CSS

// Header component definition
function Header() {
    const { isAuthenticated, user } = useContext(AuthContext); // Removed unused logout
    const BASE_URL = 'http://localhost:5000';

    return (
        <header className="header">
            {/* Logo section */}
            <div className="logo-container">
                {/* Clicking logo redirects to homepage */}
                <Link to="/">
                    <img src="/logo.png" alt="Ghumnajam Logo" className="logo" />
                </Link>
                {/* Tagline under logo */}
                <p className="logo-text">EXPLORE WITH EASE</p>
            </div>

            {/* Navigation + Auth Section */}
            <div className="nav-container">
                <nav className="nav">
                    {/* Navigation links */}
                    <Link to="/about">About</Link>
                    <Link to="/destinations">Destinations</Link>
                    <Link to="/guides">Guides</Link>
                    <Link to="/blog">Blog</Link>
                </nav>

                {/* Conditional rendering based on auth state */}
                {isAuthenticated ? (
                    // If logged in: Show profile
                    <div className="profile-container">
                        <Link to="/profile" className="profile-link">
                            <img
                                src={user.avatarUrl ? `${BASE_URL}${user.avatarUrl}` : '/default-avatar.png'}
                                alt="User Avatar"
                                className="avatar"
                            />
                            <span className="username">{user.name || 'Guest'}</span>
                        </Link>
                    </div>
                ) : (
                    // If not logged in: Show login button
                    <Link to="/login">
                        <button className="sign-in-button">Log in</button>
                    </Link>
                )}
            </div>
        </header>
    );
}

export default Header;