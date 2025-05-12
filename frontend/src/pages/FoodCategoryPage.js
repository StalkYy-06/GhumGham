 import React, { useState, useEffect } from 'react';
 import './BlogPostList.css';
 import { Link } from 'react-router-dom';
 import daalbhat from './images/daalbhat.jpg';

 function FoodCategoryPage() {
  const [foodPosts, setFoodPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
   setTimeout(() => {
    const mockFoodPosts = [
     {
      slug: 'nepali-dal-bhat-recipe',
      title: 'The Heart of Nepali Cuisine: Mastering Dal Bhat',
      imageUrl: daalbhat, 
      excerpt: 'Discover the national dish of Nepal: a comforting and nutritious meal of lentil soup, rice, and curries...',
      categories: [{ name: 'Food', slug: 'food' }, { name: 'Culture', slug: 'culture' }, { name: 'Nepal', slug: 'nepal' }],
     },
     {
      slug: 'momo-making-class-kathmandu',
      title: 'Unlock the Secrets of Delicious Nepali Momos in Kathmandu',
      imageUrl: '/momo_making_thumb.jpg', 
      excerpt: 'Join a local cooking class and learn the art of making traditional Nepali dumplings: momos...',
      categories: [{ name: 'Food', slug: 'food' }, { name: 'Cooking Class', slug: 'cooking-class' }, { name: 'Nepal', slug: 'nepal' }],
     },
     {
      slug: 'newari-food-experience',
      title: 'A Culinary Journey Through Newari Cuisine',
      imageUrl: '/newari_food_thumb.jpg', 
      excerpt: 'Experience the unique and flavorful dishes of the Newari people, the indigenous community of the Kathmandu Valley...',
      categories: [{ name: 'Food', slug: 'food' }, { name: 'Culture', slug: 'culture' }, { name: 'Nepal', slug: 'nepal' }],
     },
    ];

    setFoodPosts(mockFoodPosts);
    setLoading(false);
   }, 1500);
  }, []);

  if (loading) {
   return <div className="loading">Loading Food & Culture Posts...</div>;
  }

  if (error) {
   return <div className="error">Error loading food & culture posts: {error}</div>;
  }

  return (
   <div className="blog-post-list-container">
    <h1>Explore Food and Culture in Nepal</h1>
    <div className="blog-post-grid">
     {foodPosts.map((post) => (
      <div key={post.slug} className="blog-post-item">
       <Link to={`/blog/${post.slug}`} className="post-image-link">
        <img src={post.imageUrl} alt={post.title} className="post-image" />
       </Link>
       <div className="post-details">
        <div className="post-meta">
         {post.categories &&
          post.categories.map((category, index) => (
           <React.Fragment key={index}>
            <Link to={`/category/${category.slug}`} className="post-category">
             {category.name}
            </Link>
            {index < post.categories.length - 1 && <span className="meta-separator"> • </span>}
           </React.Fragment>
          ))}
        </div>
        <h2 className="post-title">
         <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>
        <p className="post-excerpt">{post.excerpt}...</p>
        <Link to={`/blog/${post.slug}`} className="read-more-button">
         Read More
        </Link>
       </div>
      </div>
     ))}
    </div>
   </div>
  );
 }

 export default FoodCategoryPage;