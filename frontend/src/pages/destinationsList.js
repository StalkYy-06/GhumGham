import React, { useEffect, useState } from 'react';
import DestinationCard from '../components/destinationCard';
import './destinationsList.css';
import Header from '../components/header';
import Footer from '../components/footer';

function DestinationsList() {
    const [destinations, setDestinations] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        //Fetch destinations
        fetch('http://localhost:5000/api/destinations', { credentials: 'include' })
            .then(res => res.json())
            .then(data => setDestinations(data))
            .catch(err => console.error('Fetch failed:', err));

        // Fetch current user to check if admin
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

    }, []);


    const handleAddDestination = () => {
        // Redirect to a new page or open a form for adding a destination
        window.location.href = '/addDestinations';
    };

    const handleDeleteDestination = (id) => {
        if (window.confirm('Do you want to delete this destination?')) {
            fetch(`http://localhost:5000/api/destinations/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            })
                .then(res => {
                    if (res.ok) {
                        setDestinations(destinations.filter(dest => dest.destinations_id !== id));
                    } else {
                        console.error('Delete failed:', res.statusText);
                    }
                })
                .catch(err => console.error('Delete failed:', err));
        }
    };

    return (
        <>
            <Header />
            <div className="destinations-list">
                {isAdmin && (
                    <button className="add-button" onClick={handleAddDestination}>
                        Add New Destination
                    </button>
                )}
                {destinations.map(destination => (
                    <DestinationCard
                        key={destination.destinations_id}
                        destination={destination}
                        onDelete={() => handleDeleteDestination(destination.destinations_id)}
                        isAdmin={isAdmin}
                    />
                ))}
            </div>
            <Footer />
        </>
    );
}

export default DestinationsList;