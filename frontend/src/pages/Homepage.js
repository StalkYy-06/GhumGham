//Landing Page for site
import React, { useState, useEffect } from 'react';
import './Homepage.css';
import Footer from '../components/footer.js';
import Header from '../components/header.js';
import muktinath from './images/muktinath.jpg';
import everest from './images/gg.jpg';
import anna from './images/anna.jpg';
import background from './images/background.jpg';
import backgroundtwo from './images/background2.jpg';
import backgroundthree from './images/background3.jpg';
import { Link } from 'react-router-dom';  // Importing Link from react-router-dom

// Hero Component with dynamic background change
function Hero() {
  const [backgroundImage, setBackgroundImage] = useState(background); // Initial background image

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundImage(prevImage => {
        if (prevImage === background) return backgroundtwo;
        if (prevImage === backgroundtwo) return backgroundthree;
        return background;
      });
    }, 15000); // Change every 15 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <section
      className="hero"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1>Plan Your Perfect Getaway</h1>
        <p>Experience unforgettable journeys with our expert guides.</p>
        <a href="#tours" className="cta-button">Explore Our Tours</a>
      </div>
    </section>
  );
}

// Tours Component
function Tours() {
  return (
    <section className="tours" id="tours">
      <h2>Our Popular Tours</h2>
      <div className="tour-cards">
        {/* Muktinath Temple Tour */}
        <div className="tour-card">
          <img
            src={muktinath}
            alt="Muktinath Temple"
            className="tour-img"
          />
          <h3>Muktinath Temple</h3>
          <p>Explore the sacred Muktinath Temple with our experienced guides. A spiritual journey at a sacred site.</p>
          <Link to="/muktinath" className="cta-button">Learn More</Link>
        </div>

        {/* Everest Base Camp Trek */}
        <div className="tour-card">
          <img
            src={everest}
            alt="Everest Base Camp"
            className="tour-img"
          />
          <h3>Everest Base Camp</h3>
          <p>Embark on the adventure of a lifetime with our Everest Base Camp trek. Challenge yourself and enjoy the breathtaking views.</p>
          <Link to="/everest" className="cta-button">Learn More</Link>
        </div>

        {/* Annapurna Circuit Trek */}
        <div className="tour-card">
          <img
            src={anna}
            alt="Annapurna Circuit"
            className="tour-img"
          />
          <h3>Annapurna Circuit Trek</h3>
          <p>Experience the majestic Annapurna range and its unique cultures on our Annapurna Circuit Trek.</p>
          <Link to="/annapurna" className="cta-button">Learn More</Link>
        </div>
      </div>
    </section>
  );
}

// Homepage Component
function Homepage() {
  return (
    <div className="homepage">
      <Header />
      <Hero />
      <Tours />
      <Footer />
    </div>
  );
}

export default Homepage;