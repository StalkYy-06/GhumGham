import React from 'react';
import './BlogCategoryPage.css';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';

function BlogCategoryPage() {
  return (
    <>
      <Header />
      <div className="category-page">
        <h1 className="page-title">Explore Our Blog Categories</h1>
        <div className="category-grid">
          <Link to="/category/adventure" className="category-item">
            <div className="image-container">
              <img src="/AdventureandTravel.jpg" alt="Adventure and Travels" />
            </div>
            <h3>Adventure and Travels</h3>
          </Link>
          <Link to="/category/food" className="category-item">
            <div className="image-container">
              <img src="/FoodandCulture.jpg" alt="Food and Culture" />
            </div>
            <h3>Food and Culture</h3>
          </Link>
          <Link to="/category/nature" className="category-item">
            <div className="image-container">
              <img src="/Nepscape.jpg" alt="Nature Escape" />
            </div>
            <h3>Nature Escape</h3>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default BlogCategoryPage;
