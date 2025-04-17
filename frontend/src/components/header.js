import React from "react";
import { Link } from "react-router-dom";
import './headerstyles.css';

function Header() {
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
                    <a href="/about">About</a>
                    <a href="/countries">Countries</a>
                    <a href="/destinations">Destinations</a>
                    <a href="/contact">Contact</a>
                </nav>
                <Link to="/Login">
                    <button className="sign-in-button">Log in</button>
                </Link>
            </div>

        </header>
    );
}

export default Header;