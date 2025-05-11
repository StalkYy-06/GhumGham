import React, { useState, useEffect } from 'react';
 import './BlogPostList.css';
 import { Link } from 'react-router-dom';

 function NatureCategoryPage() {
  const [naturePosts, setNaturePosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const error = null; 

  useEffect(() => {
   setTimeout(() => {
    const mockNaturePosts = [
     {
      slug: 'hiking-everest-region',
      title: 'Breathtaking Hikes in the Everest Region',
      imageUrl: '/everest_hike_thumb.jpg', 
      excerpt: 'Discover stunning trails with unparalleled views of the world\'s highest peaks in the Everest region of Nepal...',
      categories: [{ name: 'Nature', slug: 'nature' }, { name: 'Hiking', slug: 'hiking' }, { name: 'Nepal', slug: 'nepal' }],
     },
     {
      slug: 'exploring-bardia-national-park',
      title: 'Wildlife Encounters in Bardia National Park',
      imageUrl: '/bardia_wildlife_thumb.jpg',
      excerpt: 'Embark on a jungle safari in Bardia National Park, home to diverse wildlife including rhinos, tigers, and elephants...',
      categories: [{ name: 'Nature', slug: 'nature' }, { name: 'Wildlife Safari', slug: 'wildlife-safari' }, { name: 'Nepal', slug: 'nepal' }],
     },
     {
      slug: 'phewa-lake-boating-pokhara',
      title: 'Tranquil Boating on Phewa Lake in Pokhara',
      imageUrl: '/phewa_lake_boating_thumb.jpg',
      excerpt: 'Enjoy the serenity of Phewa Lake with a relaxing boat ride and stunning reflections of the Annapurna mountains...',
      categories: [{ name: 'Nature', slug: 'nature' }, { name: 'Boating', slug: 'boating' }, { name: 'Nepal', slug: 'nepal' }],
     },
    ];

    setNaturePosts(mockNaturePosts);
    setLoading(false);
   }, 1500);
  }, []);

  if (loading) {
   return <div className="loading">Loading Nature Escape Posts...</div>;
  }

  if (error) {
   return <div className="error">Error loading nature escape posts: {error}</div>;
  }

  return (
   <div className="blog-post-list-container">
    <h1>Explore Nature Escapes in Nepal</h1>
    <div className="blog-post-grid">
     {naturePosts.map((post) => (
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

 export default NatureCategoryPage;