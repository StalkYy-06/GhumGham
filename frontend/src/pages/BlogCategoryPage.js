import React from 'react';
 import './BlogCategoryPage.css';
 import { Link } from 'react-router-dom';

 function BlogCategoryPage() {
  return (
    <div className="category-page">
      <h1>Explore Our Blog Categories</h1> {/* Clear heading */}
      <div className="category-grid">
        <Link to="/category/adventure" className="category-item">
          <img src="/AdventureandTravel.jpg" alt="Adventure Travel" />
          <h3>Adventure and Travels</h3>
        </Link>
        <Link to="/category/food" className="category-item">
          <img src="/FoodandCulture.jpg" alt="Food & Culture" />
          <h3>Food and Culture</h3>
        </Link>
        <Link to="/category/nature" className="category-item">
          <img src="/Nepscape.jpg" alt="Nature Escapes" />
          <h3>Nature Escape</h3>
        </Link>
      </div>
    </div>
  );
 }

 export default BlogCategoryPage;