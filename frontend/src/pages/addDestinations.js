import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './addDestinations.css';

function AddDestinations() {
    const navigate = useNavigate();
    const [destination, setDestination] = useState({
        destinations_name: '',
        description_short: '',
        description_long: '',
        total_days: '',
        destinations_photo: '',
        cost_estimate: '',
        tour_type: '',
        difficulty_level: '',
        max_altitude: '',
        best_season: '',
        latitude: '',
        longitude: ''
    });
    const [photoFile, setPhotoFile] = useState(null);
    const [error, setError] = useState(null);
    const [isAdmin, setIsAdmin] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/api/users/profile', { credentials: 'include' })
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch user data');
                return res.json();
            })
            .then(data => {
                setIsAdmin(data.user && data.user.role === "admin");
            })
            .catch(err => {
                console.error('Fetch user status failed:', err);
                setIsAdmin(false);
                setError('Unable to verify user status. Please log in again.');
            });
    }, []);

    const validDifficulties = ['easy', 'moderate', 'hard', 'expert'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDestination(prev => ({ ...prev, [name]: value }));
    };

    const handlePhotoChange = (e) => {
        setPhotoFile(e.target.files[0]);
    };

    const isInteger = (value) => /^\d+$/.test(value);
    const isValidDecimal = (value) => /^\d{1,3}(\.\d{1,6})?$/.test(value);

    const handleSubmit = async (e) => {
        setError(null);
        e.preventDefault();

        if (!isAdmin) {
            setError('You must be an admin to add a destination.');
            return;
        }

        const difficulty = destination.difficulty_level.toLowerCase();
        if (!validDifficulties.includes(difficulty)) {
            return setError('Please enter one of the following difficulty levels: easy, moderate, hard, expert.');
        }

        if (!isInteger(destination.max_altitude)) {
            return setError('Max Altitude must be an integer.');
        }

        if (!isValidDecimal(destination.latitude)) {
            return setError('Latitude must be a decimal with up to 6 digits after the point.');
        }

        if (!isValidDecimal(destination.longitude)) {
            return setError('Longitude must be a decimal with up to 6 digits after the point.');
        }

        const formData = new FormData();
        for (const key in destination) {
            formData.append(key, destination[key]);
        }
        if (photoFile) {
            formData.append('destinations_photo', photoFile);
        }

        try {
            const res = await fetch('http://localhost:5000/api/destinations/add', {
                method: 'POST',
                credentials: 'include',
                body: formData,
            });
            if (!res.ok) throw new Error('Failed to add destination');
            navigate('/destinations');
        } catch (err) {
            setError(err.message);
        }
    };

    if (isAdmin === false) {
        return <div className="error">Access Denied: Admin privileges required.</div>;
    }
    return (
        <div className="add-container">
            <h2>Add New Destination</h2>
            <form onSubmit={handleSubmit} className="add-form">
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" name="destinations_name" value={destination.destinations_name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Short Description:</label>
                    <textarea
                        name="description_short"
                        value={destination.description_short}
                        onChange={handleChange}
                        onInput={(e) => {
                            e.target.style.height = 'auto';
                            e.target.style.height = `${e.target.scrollHeight}px`;
                        }}
                        required />
                </div>
                <div className="form-group">
                    <label>Long Description:</label>
                    <textarea
                        name="description_long"
                        value={destination.description_long}
                        onChange={handleChange}
                        onInput={(e) => {
                            e.target.style.height = 'auto';
                            e.target.style.height = `${e.target.scrollHeight}px`;
                        }}
                    />
                </div>
                <div className="form-group">
                    <label>Total Days:</label>
                    <input type="text" name="total_days" value={destination.total_days} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Photo:</label>
                    <div className="file-upload-wrapper">
                        <label htmlFor="file-upload" className="file-upload-label_a">
                            {photoFile ? 'Change File' : 'Choose File'}
                        </label>
                        <input
                            id="file-upload"
                            type="file"
                            accept="image/*"
                            className="file-upload-input"
                            onChange={handlePhotoChange}
                            required
                        />
                        {photoFile && (
                            <div className="file-upload-filename">
                                {photoFile.name}
                            </div>
                        )}
                    </div>
                </div>

                <div className="form-group">
                    <label>Cost Estimate:</label>
                    <input type="number" name="cost_estimate" value={destination.cost_estimate} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Tour Type:</label>
                    <input type="text" name="tour_type" value={destination.tour_type} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Difficulty Level:</label>
                    <input type="text" name="difficulty_level" value={destination.difficulty_level} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Max Altitude (m):</label>
                    <input type="number" name="max_altitude" value={destination.max_altitude} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Best Season:</label>
                    <input type="text" name="best_season" value={destination.best_season} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Latitude:</label>
                    <input type="number" step="0.000001" name="latitude" value={destination.latitude} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Longitude:</label>
                    <input type="number" step="0.000001" name="longitude" value={destination.longitude} onChange={handleChange} required />
                </div>
                {error && <div className="error_a">{error}</div>}
                <button type="submit" className="save-button">Add Destination</button>
                <button type="button" className="cancel-button" onClick={() => navigate('/destinations')}>Cancel</button>
            </form>
        </div>
    );
}

export default AddDestinations;