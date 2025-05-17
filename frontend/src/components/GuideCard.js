import React from 'react';
import { Link } from 'react-router-dom';
import './GuideCard.css';

function GuideCard({ guide }) {
  return (
    <div className="guide-card">
      <Link to={`/guides/${guide._id}`} className="guide-card-link">
        <img src={guide.image} alt={guide.name} className="guide-img" />
        <h3>{guide.name}</h3>
        {guide.description && <p className="guide-description">{guide.description}</p>}
        {guide.phone && <p className="guide-phone">Phone: {guide.phone}</p>}
        {guide.expertise && <p className="guide-expertise">Expertise: {guide.expertise}</p>}
        {guide.rating && <p className="guide-rating">Rating: {guide.rating}/5</p>}
      </Link>
    </div>
  );
}

export default GuideCard;