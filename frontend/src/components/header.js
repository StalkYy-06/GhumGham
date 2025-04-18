import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import './headerstyles.css';

function Header() {
    const context = useContext(AuthContext);
    console.log("AuthContext in Header:", context); // Debug log

    // Fallback if context is undefined
    if (!context) {
        return (
            <header className="header">
                <div className="logo-container">
                    <Link to="/">
                        <img src="/logo.png" alt="Ghumnajam Logo" className="logo" />
                    </Link>
                    <p className="logo-text">EXPLORE WITH EASE</p>
                </div>
                <div className="nav-container">
                    <nav className="nav">
                        <Link to="/about">About</Link>
                        <Link to="/countries">Countries</Link>
                        <Link to="/destinations">Destinations</Link>
                        <Link to="/contact">Contact</Link>
                    </nav>
                    <Link to="/login">
                        <button className="sign-in-button">Log in</button>
                    </Link>
                </div>
            </header>
        );
    }

    const { isAuthenticated, logout } = context;

    return (
        <header className="header">
            <div className="logo-container">
                <Link to="/">
                    <img src="/logo.png" alt="Ghumnajam Logo" className="logo" />
                </Link>
                <p className="logo-text">EXPLORE WITH EASE</p>
            </div>
            <div className="nav-container">
                <nav className="nav">
                    <Link to="/about">About</Link>
                    <Link to="/countries">Countries</Link>
                    <Link to="/destinations">Destinations</Link>
                    <Link to="/contact">Contact</Link>
                </nav>
                {isAuthenticated ? (
                    <div className="profile-container">
                        <Link to="/profile" className="profile-link">
                            <span className="profile-icon">👤</span>
                        </Link>
                        <button onClick={logout} className="sign-in-button">Log out</button>
                    </div>
                ) : (
                    <Link to="/login">
                        <button className="sign-in-button">Log in</button>
                    </Link>
                )}
            </div>
        </header>
    );
}

export default Header;