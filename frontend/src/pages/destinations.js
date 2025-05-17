import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Destinations.css';
import Header from '../components/header';
import Footer from '../components/footer';

function Destinations() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [destination, setDestination] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const fetchDestination = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/destinations/${id}`, {
                    credentials: 'include',
                });
                if (!response.ok) throw new Error('Failed to fetch destination');
                const data = await response.json();
                setDestination(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        const fetchProfile = async () => {
            fetch('http://localhost:5000/api/users/profile', { credentials: 'include' })
                .then(res => {
                    if (!res.ok) {
                        throw new Error('Failed to fetch user data');
                    }
                    return res.json();
                })
                .then(data => {
                    // Set isAdmin to true if the user's role is "admin"
                    setIsAdmin(data.user && data.user.role === "admin");
                })
                .catch(err => {
                    console.error('Error fetching user data:', err);
                    setIsAdmin(false); // Default to non-admin on error
                });
        }

        fetchProfile();
        fetchDestination();
    }, [id]);

    const handleBookNow = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/booking/create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ destination_id: id, booked_date: new Date().toISOString().split('T')[0] }),
            });
            if (!response.ok) throw new Error('Failed to create booking');
            alert('Booking created successfully!');
            navigate('/bookings');
        } catch (err) {
            alert(`Error: ${err.message}`);
        }
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;
    if (!destination) return null;

    const position = [destination.latitude, destination.longitude];

    return (

        <div>
            <Header />

            <div className='edit'>
                {isAdmin && (
                    <button
                        className="edit-button"
                        onClick={() => navigate(`/editDestinations/${id}`)}
                    >
                        Edit Destination
                    </button>

                )}
            </div>
            <div className="destination-page">
                <div className="hero-section">
                    <img
                        src={`http://localhost:5000${destination.destinations_photo}`}
                        alt={destination.destinations_name}
                        className="hero-image"
                    />
                    <div className="hero-overlay">
                        <h1 className="destination-name_2">{destination.destinations_name}</h1>
                    </div>
                </div>
                <div className="content-section">
                    <div className="description-container">
                        <h2 className="section-title">Overview</h2>
                        <p className="description-long">{destination.description_long}</p>
                    </div>
                    <div className="details-container">
                        <h2 className="section-title">Trip Details</h2>
                        <div className="details-list">
                            <p className="detail-item"><strong>Duration:</strong> {destination.total_days} days</p>
                            <p className="detail-item"><strong>Cost:</strong> ${destination.cost_estimate}</p>
                            <p className="detail-item"><strong>Type:</strong> {destination.tour_type}</p>
                            <p className="detail-item"><strong>Difficulty:</strong> {destination.difficulty_level}</p>
                            <p className="detail-item"><strong>Max Altitude:</strong> {destination.max_altitude} m</p>
                            <p className="detail-item"><strong>Best Season to Visit:</strong> {destination.best_season}</p>
                        </div>
                    </div>
                    <div className="map-container">
                        <h2 className="section-title">Location Map</h2>
                        <MapContainer center={position} zoom={10} style={{ height: '400px', width: '100%', borderRadius: '15px' }}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <Marker position={position}>
                                <Popup>{destination.destinations_name}</Popup>
                            </Marker>
                        </MapContainer>
                    </div>
                    <button className="book-button" onClick={handleBookNow}>
                        Book Now
                    </button>
                </div>
            </div>

            <Footer />
        </div >
    );
}

export default Destinations;