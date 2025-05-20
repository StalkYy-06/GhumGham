import React from 'react';
import './About.css';
import Header from '../components/header'; 
import Footer from '../components/footer'; 
import herosection from './images/herosection.avif'; 
import guide1 from './images/guide1.jpg';
import guide2 from './images/guide2.jpg';
import team1 from './images/team1.jpg';
import team2 from './images/team2.jpeg';
import team3 from './images/team3.jpg';
import team4 from './images/team4.jpg';
import guideicon from './images/guideicon.png';
import mapicon from './images/mapicon.png';
import communityicon from './images/communityicon.png';

function About() {
  return (
    <div className="about-wrapper">
      <Header />

      {/* Hero Section */}
      <div
        className="about-hero"
        style={{
          backgroundImage: `url(${herosection})`, 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <div className="overlay">
          <h1>About GhumnaJam</h1>
          <p>Explore Nepal with Confidence & Curiosity</p>
        </div>
      </div>

      {/* Main Content */}
      <main className="about-main">
        <section className="about-section">
          <h2>Who We Are</h2>
          <p>
            GhumnaJam is a travel guidance platform built to help users explore Nepal through curated blogs,
            personalized suggestions, and reliable destination guides.
          </p>
        </section>

        <section className="mission-highlight">
          <h2>Our Mission</h2>
          <p>
            Our mission is to make travel planning smarter and more inspiring, helping users connect deeply with
            culture, adventure, and natural beauty.
          </p>
        </section>

        <section className="values-section">
          <h2>Why Choose Us?</h2>
          <div className="values-grid">
            <div className="value-card">
              <img src={guideicon} alt="Guide Icon" style={{height: '50px', marginBottom: '1rem'}}/>
              <h4>Trusted Guides</h4>
              <p>Carefully curated and locally informed guides for every type of traveler.</p>
            </div>
            <div className="value-card">
              <img src={mapicon} alt="Map Icon" style={{height: '50px', marginBottom: '1rem'}}/>
              <h4>Smart Planning</h4>
              <p>Personalized suggestions tailored to your interests and travel style.</p>
            </div>
            <div className="value-card">
              <img src={communityicon} alt="Community Icon" style={{height: '50px', marginBottom: '1rem'}}/>
              <h4>Local Community</h4>
              <p>Connect with local culture, food, and people to enhance your travel experience.</p>
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="team-section">
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            {[
              { name: 'Swarnim Rai', role: 'Backend Developer', img: guide2 },
              { name: 'Anish Rajlawat', role: 'Frontend Developer', img: guide1 },
              { name: 'Pratik Shrestha', role: 'Frontend Developer', img: team3 },
              { name: 'Uday Paudel', role: 'Project Manager', img: team1 },
              { name: 'Ronast Acharya', role: 'Business Analyst', img: team4},
              { name: 'Supriya Kunwar', role: 'Frontend/Backend Developer', img: team2},
            ].map((member, idx) => (
              <div key={idx} className="team-card">
                <img src={member.img} alt={member.name} className="team-photo" />
                <h4>{member.name}</h4>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default About;
