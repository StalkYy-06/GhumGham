import React, { useState, useEffect, useContext } from "react";
import './ProfileStyle.css';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const BASE_URL = 'http://localhost:5000';

function ProfilePage() {
    const { isAuthenticated, user, login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        bio: "",
        avatar_url: "",
    });
    const [error, setError] = useState('');
    const [preview, setPreview] = useState('');

    // Redirect if not authenticated
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    // Fetch profile from backend on mount
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/users/profile', {
                    credentials: 'include',
                });
                if (response.ok) {
                    const data = await response.json();
                    const userData = data.user || data;
                    const avatarPath = userData.avatar_url || '/uploads/default-avatar.png';
                    const fullAvatarURL = `${BASE_URL}${avatarPath}`;
                    setProfile({
                        name: userData.name,
                        email: userData.email,
                        bio: userData.bio || '',
                        avatar_url: fullAvatarURL,
                    });
                    setPreview(fullAvatarURL);
                    login({ ...userData, avatar_url: fullAvatarURL });
                } else {
                    setError('Failed to fetch profile');
                }
            } catch (err) {
                setError('Server error');
                console.error('Fetch profile failed:', err);
            }
        };
        if (isAuthenticated) fetchProfile();
    }, [isAuthenticated, login, navigate]);


    // Delete profile
    const handleDelete = async () => {
        setError('');
        try {
            await fetch('http://localhost:5000/api/users/delete', {
                method: 'DELETE',
                credentials: 'include',
            });
            localStorage.removeItem('userProfile');
            setProfile({ name: "", email: "", bio: "", avatar_url: "" });
            navigate('/login');
        } catch (err) {
            setError('Failed to delete profile');
            console.error('Delete profile failed:', err);
        }
    };

    return (
        <div className="profile-page">
            <h1>User Profile</h1>
            {error && <p className="error">{error}</p>}
            <div className="profile-details">
                <div className="detail-item">
                    <h2>Avatar</h2>
                    {profile.avatar_url ? (
                        <img
                            src={profile.avatar_url}
                            alt="User Avatar"
                            className="avatar"
                            loading="lazy"
                        />
                    ) : (
                        <p>Not set</p>
                    )}
                </div>
                <div className="detail-item">
                    <h2>Name</h2>
                    <p>{profile.name || "Not set"}</p>
                </div>
                <div className="detail-item">
                    <h2>Email</h2>
                    <p>{profile.email || "Not set"}</p>
                </div>
                <div className="detail-item">
                    <h2>Bio</h2>
                    <p>{profile.bio || "Not set"}</p>
                </div>
                <div className="detail-actions">
                    <button onClick={() => navigate('/edit-profile')} className="edit-button">Edit Profile</button>
                    <button onClick={handleDelete} className="delete-button">Delete Profile</button>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;