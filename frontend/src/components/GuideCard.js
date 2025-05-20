import React from 'react';
import { Link } from 'react-router-dom';
import './GuideCard.css';

function GuideCard({ guide }) {
  return (
    <div className="guide-card">
      <Link to={`/guides/${guide._id}`} className="guide-card-link">
        <img
          src={guide.image}
          alt={`Guide ${guide.name} - ${guide.description || 'Tour expert'}`}
          className="guide-img"
        />

        <h3 className="guide-name">{guide.name}</h3>

        <div className="guide-info-wrapper"> {/* New wrapper for text info */}
          <div className="guide-description-box">
            {guide.description && <p className="guide-description">{guide.description}</p>}
          </div>
          {guide.phone && <p className="guide-phone">📞 {guide.phone}</p>}
          {guide.expertise && <p className="guide-expertise">💼 {guide.expertise}</p>}
          {guide.rating && <p className="guide-rating">⭐ {guide.rating}/5</p>}
        </div>
      </Link>
    </div>
  );
}

export default GuideCard;