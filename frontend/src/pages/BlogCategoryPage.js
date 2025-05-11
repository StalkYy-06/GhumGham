import React from 'react';
import { useParams } from 'react-router-dom';
import './BlogCategoryPage.css';

function BlogCategoryPage() {
  const { categoryId } = useParams();  // Get the categoryId from the URL

  const getCategoryContent = (category) => {
    switch (category) {
      case 'adventure':
        return {
          title: 'Adventure and Travels',
          content: 'Content related to Adventure and Travel. Explore the world of adventure tourism and travel tips.',
        };
      case 'food':
        return {
          title: 'Food and Culture',
          content: 'Content related to Food & Culture. Discover local dishes, food festivals, and culinary traditions.',
        };
      case 'nature':
        return {
          title: 'Nature Escape',
          content: 'Content related to Nature Escapes. Learn about beautiful natural destinations and outdoor adventures.',
        };
      default:
        return {
          title: 'Unknown Category',
          content: 'Sorry, we could not find content for this category.',
        };
    }
  };

  const { title, content } = getCategoryContent(categoryId); // Get content based on categoryId

  return (
    <div className="category-page">
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );
}

export default BlogCategoryPage;
