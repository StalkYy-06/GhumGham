import React from 'react';
import { Link } from 'react-router-dom';
import './GuideCard.css';

function GuideCard({ guide }) {
  return (
    <div className="guide-card">
      <img src={guide.image} alt={guide.name} className="guide-img" />
      <h3 className="guide-name-clickable">
        <Link to={`/guides/${guide._id}`}>{guide.name}</Link> 
      </h3>
      {guide.description && <p className="guide-description">{guide.description}</p>}
      {guide.phone && <p className="guide-phone">Phone: {guide.phone}</p>}
      {guide.expertise && <p className="guide-expertise">Expertise: {guide.expertise}</p>}
      {guide.rating && <p className="guide-rating">Rating: {guide.rating}/5</p>}
    </div>
  );
}

export default GuideCard;