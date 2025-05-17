import React, { useState, useEffect } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import Sidebar from '../components/Sidebar';
import BookingCard from '../components/bookingCard';
import './bookings.css';
import { useNavigate } from 'react-router-dom';

const BASE_URL = 'http://localhost:5000';

const Booking = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchBookings();
        fetchUserData();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/booking/details`, {
                method: 'GET',
                credentials: 'include',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error fetching booking details');
            }

            const data = await response.json();
            console.log('Fetched booking details:', data);
            setBookings(data);
            setLoading(false);
        } catch (err) {
            console.error('Fetch booking details error:', err);
            setError(err.message || 'Error fetching booking details');
            setLoading(false);
        }
    };

    const fetchUserData = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/users/profile`, {
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Error fetching user data');
            }

            const data = await response.json();
            setUserRole(data.role || (data.user && data.user.role));
            setUserId(data.id || (data.user && data.user.id));
        } catch (err) {
            console.error('Error fetching user data:', err);
            setUserRole(null);
            setUserId(null);
        }
    };

    const handleCancelBooking = async (bookingId) => {
        try {
            const response = await fetch(`${BASE_URL}/api/booking/remove/${bookingId}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error cancelling booking');
            }

            setBookings(bookings.filter((booking) => booking.id !== bookingId));
            alert('Booking cancelled successfully');
        } catch (err) {
            alert(err.message || 'Error cancelling booking');
        }
    };

    const handleViewDestination = (destinationId) => {
        if (destinationId) {
            navigate(`/destinations/${destinationId}`);
        } else {
            alert('Destination ID not available');
        }
    };

    if (loading) return <div className="loading_b">Loading...</div>;
    if (error) return <div className="error_b">{error}</div>;

    return (
        <div>
            <Header />
            <div className="bookings-container_b">
                <Sidebar />
                <div className="bookings-content_b">
                    <div className="bookings-page_b">
                        <h1>Booked Trips</h1>
                        {bookings.length === 0 ? (
                            <p className="loading_b">No bookings found.</p>
                        ) : (
                            <div className="bookings-details_b">
                                {bookings.map((booking) => (
                                    <BookingCard
                                        key={booking.id}
                                        booking={booking}
                                        onCancel={handleCancelBooking}
                                        onViewDestination={handleViewDestination}
                                        isAdmin={userRole === 'admin'}
                                        currentUserId={userId}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Booking;