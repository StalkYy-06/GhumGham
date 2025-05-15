import React from 'react';
import './BookingCard.css';

function BookingCard({ booking, onCancel, onViewDestination, isAdmin, currentUserId }) {
    const handleCancelClick = (e) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to cancel this booking?')) {
            onCancel(booking.id);
        }
    };

    const handleCardClick = () => {
        onViewDestination(booking.destination_id);
    };

    return (
        <div className="booking-card_b" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
            <h2 className="booking-name">{booking.trip_name}</h2>
            <div className="booking-content">
                <p className="booking-detail"><strong>Name:</strong> {booking.name}</p>
                <p className="booking-detail">
                    <strong>Booked Date:</strong>{' '}
                    {new Date(booking.booked_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                    })}
                </p>
                <p className="booking-detail"><strong>Cost:</strong> ${booking.trip_cost}</p>
                <p className="booking-detail"><strong>Estimated Days:</strong> {booking.trip_estimated_days}</p>
                {isAdmin && booking.user_email && (
                    <p className="booking-detail"><strong>User Email:</strong> {booking.user_email}</p>
                )}
                {(isAdmin || booking.user_id === currentUserId) && (
                    <div className="button-container">
                        <button className="cancel-button_b" onClick={handleCancelClick}>
                            Cancel Booking
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default BookingCard;