import React, { useState, useEffect } from 'react';
import './BlogPostList.css';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';

import annapurnaBaseCamp from './images/annapurnabasecamp.jpg';
import kathmanduvalley from './images/kathmanduvalley.jpg';
import chitwannationalpark from './images/chitwannationalpark.jpg';

function AdventureCategoryPage() {
  const [adventurePosts, setAdventurePosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      const mockAdventurePosts = [
        {
          slug: 'annapurna-base-camp-trek',
          title: 'Discover the Wonders of the Annapurna Base Camp Trek',
          imageUrl: annapurnaBaseCamp,
          excerpt:
            'Embark on a classic trekking adventure to the foot of the majestic Annapurna range. Experience diverse landscapes and rich culture...',
          categories: [
            { name: 'Adventure', slug: 'adventure' },
            { name: 'Trekking', slug: 'trekking' },
            { name: 'Nepal', slug: 'nepal' },
          ],
        },
        {
          slug: 'kathmandu-valley-cultural-tour',
          title: 'Immerse Yourself in the Rich Culture of Kathmandu Valley',
          imageUrl: kathmanduvalley,
          excerpt:
            "Explore the ancient temples, historical sites, and vibrant traditions of the Kathmandu Valley. A journey through Nepal's cultural heartland...",
          categories: [
            { name: 'Adventure', slug: 'adventure' },
            { name: 'Cultural Tours', slug: 'cultural-tours' },
            { name: 'Nepal', slug: 'nepal' },
          ],
        },
        {
          slug: 'chitwan-national-park-nature-safari',
          title: 'Experience Wildlife and Nature in Chitwan National Park',
          imageUrl: chitwannationalpark,
          excerpt:
            'Discover the diverse flora and fauna of Chitwan National Park through guided nature walks and wildlife safaris...',
          categories: [
            { name: 'Adventure', slug: 'adventure' },
            { name: 'Nature Walks', slug: 'nature-walks' },
            { name: 'Wildlife Safari', slug: 'wildlife-safari' },
            { name: 'Nepal', slug: 'nepal' },
          ],
        },
      ];

      setAdventurePosts(mockAdventurePosts);
      setLoading(false);
    }, 1500);
  }, []);

  if (loading) return <div className="loading">Loading Adventure Posts...</div>;
  if (error) return <div className="error">Error loading adventure posts: {error}</div>;

  return (
    <>
      <Header />
      <div className="blog-post-list-container">
        <h1>Explore Adventure Destinations in Nepal</h1>
        <div className="blog-post-grid">
          {adventurePosts.map((post) => (
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
                        {index < post.categories.length - 1 && (
                          <span className="meta-separator"> • </span>
                        )}
                      </React.Fragment>
                    ))}
                </div>
                <h2 className="post-title">
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="post-excerpt">{post.excerpt}</p>
                <Link to={`/blog/${post.slug}`} className="read-more-button">
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AdventureCategoryPage;
