import React from 'react';
import { useNavigate, useEffect, useState } from 'react-router-dom';
import './DestinationCard.css';


function DestinationCard({ destination, onDelete, isAdmin }) {

    const navigate = useNavigate();



    const handleCardClick = () => {
        navigate(`/destinations/${destination.destinations_id}`);
    };

    const handleDeleteClick = (e) => {
        e.stopPropagation(); // Prevent card click from triggering navigation
        onDelete(destination.destinations_id);
    };

    return (
        <div className="destination-card" onClick={handleCardClick}>
            <div className="photo-container">
                <img
                    src={`http://localhost:5000${destination.destinations_photo}`}
                    alt={destination.destinations_name}
                    className="destination-photo"
                    loading="lazy"
                />
                <div className="photo-overlay">
                    <span className="photo-label">{destination.best_season}</span>
                </div>
            </div>
            <div className="destination-content">
                <h3 className="destination-name">{destination.destinations_name}</h3>
                <p className="description-short">{destination.description_short}</p>
                <div className="destination-meta">
                    <span className="meta-item">Days: {destination.total_days}</span>
                    <span className="meta-item">Cost: ${destination.cost_estimate}</span>
                    <span className="meta-item">Type: {destination.tour_type}</span>
                    <span className="meta-item">Difficulty: {destination.difficulty_level}</span>
                </div>
                <div className="button-container">
                    <button className="view-details-button">View Details</button>
                    {isAdmin && (
                        <button className="delete-button" onClick={handleDeleteClick}>
                            Delete
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DestinationCard;