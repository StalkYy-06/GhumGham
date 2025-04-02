import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import './Homepage.css';


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