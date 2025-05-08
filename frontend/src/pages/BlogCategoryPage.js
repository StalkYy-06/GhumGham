// BlogCategoryPage.js
import React from 'react';
import './BlogCategoryPage.css';

function BlogCategoryPage({ imageSrc, title, content }) {
  return (
    <div className="category-page">
      <img src={imageSrc} alt={title} className="category-image" />
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );
}

export default BlogCategoryPage;
