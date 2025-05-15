import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './editDestinations.css';

function EditDestinations() {
    const { id } = useParams();
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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [photoFile, setPhotoFile] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/api/destinations/${id}`, { credentials: 'include' })
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch destination');
                return res.json();
            })
            .then(data => {
                setDestination(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDestination(prev => ({ ...prev, [name]: value }));
    };

    const handlePhotoChange = (e) => {
        setPhotoFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (const key in destination) {
            formData.append(key, destination[key]);
        }
        if (photoFile) {
            formData.append('destinations_photo', photoFile);
        }

        try {
            const res = await fetch(`http://localhost:5000/api/destinations/update/${id}`, {
                method: 'PUT',
                credentials: 'include',
                body: formData,
            });
            if (!res.ok) throw new Error('Failed to update destination');
            navigate('/destinations');
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="edit-container">
            <h2>Edit Destination</h2>
            <form onSubmit={handleSubmit} className="edit-form">
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
                    <input type="file" accept="image/*" onChange={handlePhotoChange} />
                    {destination.destinations_photo && <img src={`http://localhost:5000${destination.destinations_photo}`} alt="Current" className="preview-photo" />}
                </div>
                <div className="form-group">
                    <label>Cost Estimate:</label>
                    <input type="text" name="cost_estimate" value={destination.cost_estimate} onChange={handleChange} required />
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
                <button type="submit" className="save-button">Save Changes</button>
                <button type="button" className="cancel-button" onClick={() => navigate('/destinations')}>Cancel</button>
            </form>
        </div>
    );
}

export default EditDestinations;