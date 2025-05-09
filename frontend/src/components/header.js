import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import './headerstyles.css';

function Header() {
    const { isAuthenticated, logout } = useContext(AuthContext);

    return (
        <header className="header">
            <div className="logo-container">
                <Link to="/">
                    <img src={`${process.env.REACT_APP_API_URL}/logo.png`} alt="Ghumnajam Logo" className="logo" />
                </Link>
                <p className="logo-text">EXPLORE WITH EASE</p>
            </div>
            <div className="nav-container">
                <nav className="nav">
                    <Link to="/about">About</Link>
                    <Link to="/countries">Countries</Link>
                    <Link to="/destinations">Destinations</Link>
                    <Link to="/guides">Guides</Link> {/* ADDED "Guides" LINK HERE */}
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