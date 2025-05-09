import React from 'react';
import './BlogLandingPage.css';
import { Link } from 'react-router-dom';

function BlogLandingPage() {
  return (
    <div className="landing-page">
      <h1>Explore Our Blog</h1>
      <div className="image-container">
        {/* Updated Links with unique category routes */}
        <Link to="/category/adventure">
          <img src="/AdventureandTravel.jpg" alt="Adventure Travel" />
          <p>Adventure and Travels</p>
        </Link>
        <Link to="/category/food">
          <img src="/FoodandCulture.jpg" alt="Food & Culture" />
          <p>Food and Culture</p>
        </Link>
        <Link to="/category/nature">
          <img src="/Nepscape.jpg" alt="Nature Escapes" />
          <p>Nature Escape</p>
        </Link>
      </div>
    </div>
  );
}

export default BlogLandingPage;
