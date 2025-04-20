import React, { useContext } from "react";
import { Link } from "react-router-dom"; // For navigation
import { AuthContext } from "../context/AuthContext"; // Importing authentication context
import './headerstyles.css'; // Importing related CSS

// Header component definition
function Header() {
    const { isAuthenticated, logout } = useContext(AuthContext); // Destructuring auth state and logout function

    return (
        <header className="header">
            {/* Logo section */}
            <div className="logo-container">
                {/* Clicking logo redirects to homepage */}
                <Link to="/">
                    <img
                        src={`${process.env.REACT_APP_API_URL}/logo.png`} // Loads logo dynamically from environment variable
                        alt="Ghumnajam Logo"
                        className="logo"
                    />
                </Link>
                {/* Tagline under logo */}
                <p className="logo-text">EXPLORE WITH EASE</p>
            </div>

            {/* Navigation + Auth Section */}
            <div className="nav-container">
                <nav className="nav">
                    {/* Navigation links */}
                    <Link to="/about">About</Link>
                    <Link to="/countries">Countries</Link>
                    <Link to="/destinations">Destinations</Link>
                    <Link to="/contact">Contact</Link>
                </nav>

                {/* Conditional rendering based on auth state */}
                {isAuthenticated ? (
                    // If logged in: Show profile and logout
                    <div className="profile-container">
                        <Link to="/profile" className="profile-link">
                            <span className="profile-icon">👤</span>
                        </Link>
                        <button onClick={logout} className="sign-in-button">Log out</button>
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

export default Header; // Export component
