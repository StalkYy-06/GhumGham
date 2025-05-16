import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header';  
import Footer from '../components/footer';  
import './BlogCategoryPage.css'; 

const adventureImage = '/AdventureandTravel.jpg';
const foodImage = '/FoodandCulture.jpg';
const natureImage = '/Nepscape.jpg';

function BlogCategoryPage() {
    return (
        <div className="blog-category-page"> 
            <Header />
            <main className="category-page-content"> 
                <h1 className="page-title">Explore Our Blog Categories</h1>
                <div className="category-grid">
                    <Link to="/category/adventure" className="category-item">
                        <div className="image-container">
                            <img src={adventureImage} alt="Adventure and Travels" />
                        </div>
                        <h3>Adventure and Travels</h3>
                    </Link>
                    <Link to="/category/food" className="category-item">
                        <div className="image-container">
                            <img src={foodImage} alt="Food and Culture" />
                        </div>
                        <h3>Food and Culture</h3>
                    </Link>
                    <Link to="/category/nature" className="category-item">
                        <div className="image-container">
                            <img src={natureImage} alt="Nature Escape" />
                        </div>
                        <h3>Nature Escape</h3>
                    </Link>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default BlogCategoryPage;