import React from 'react';
import './Headerstyles.css'; // Import the consolidated CSS
import BGimg from './images/muktinath-temple.jpg';

function Header() {
  return (
    <header className="header">
      <div className="logo-container">
        <img src="GhumnaJam Logo.jpeg" alt="Ghumnajam Logo" className="logo" />
        <p className="logo-text">EXPLORE WITH EASE</p>
      </div>
      <nav className="nav">
        <a href="/about">About</a>
        <a href="/countries">Countries</a>
        <a href="/destinations">Destinations</a>
        <a href="/contact">Contact</a>
      </nav>
      <button className="sign-in-button">Sign in</button>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Plan your perfect getaway</h1>
        <p>Experience unforgettable journeys with our expert guides.</p>
      </div>
    </section>
  );
}

function Tours() {
  return (
    <section className="tours">
      {/* Add tour options here */}
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; 2025 GhumnaJam. All rights reserved.</p>
      <nav>
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms of Service</a>
      </nav>
    </footer>
  );
}

function Homepage() {
  return (
    <div className="homepage">
      <Header />
      <Hero />
      <Tours />
      <Footer />  {/* Added Footer Function */}
    </div>
  );
}

export default Homepage;
