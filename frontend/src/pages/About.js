// About.js
import React from 'react';
import './About.css';
import Header from '../components/header';
import Footer from '../components/footer';

function About() {
  return (
    <div className="">
      <Header />
      <div className="about-page">
        <div className="about-content">
          <h1>About Ghumnajam</h1>
          <p className="description">
            Ghumnajam is a travel guidance platform built to help users explore Nepal through curated blogs, personalized suggestions, and reliable destination guides.
          </p>
          <p className="description">
            Our mission is to make travel planning smarter and more inspiring, helping users connect deeply with culture, adventure, and natural beauty.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About;
