import React, { useState, useEffect, useContext } from "react";
import './ProfileStyle.css';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const BASE_URL = 'http://localhost:5000';

function EditProfilePage() {
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

    // Initialize profile data
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/users/profile`, {
                    credentials: 'include',
                });
                if (response.ok) {
                    const data = await response.json();
                    const userData = data.user || data;
                    const avatarPath = userData.avatar_url || '/Uploads/default-avatar.png';
                    const fullAvatarURL = `${BASE_URL}${avatarPath}`;
                    setProfile({
                        name: userData.name,
                        email: userData.email,
                        bio: userData.bio || '',
                        avatar_url: fullAvatarURL,
                    });
                    setPreview(fullAvatarURL);
                } else {
                    setError('Failed to fetch profile');
                }
            } catch (err) {
                setError('Server error');
                console.error('Fetch profile failed:', err);
            }
        };
        if (isAuthenticated) fetchProfile();
    }, [isAuthenticated]);

    // Handle form input changes
    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    // Handle avatar upload
    const handleAvatarUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('avatar', file);

        try {
            const response = await fetch(`${BASE_URL}/api/users/upload-avatar`, {
                method: 'POST',
                body: formData,
                credentials: 'include',
            });
            if (response.status === 401) {
                setError('Session expired. Please log in again.');
                navigate('/login');
                return;
            }
            if (response.ok) {
                const data = await response.json();
                const fullAvatarURL = `${BASE_URL}${data.avatar_url}`;
                setProfile({ ...profile, avatar_url: fullAvatarURL });
                setPreview(fullAvatarURL);
                login({ ...user, avatar_url: fullAvatarURL });
            } else {
                const data = await response.json();
                setError(data.error || 'Failed to upload avatar');
            }
        } catch (err) {
            setError('Server error');
            console.error('Avatar upload failed:', err);
        }
    };

    // Save profile to backend
    const handleSave = async () => {
        setError('');
        try {
            const response = await fetch(`${BASE_URL}/api/users/update`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: profile.name,
                    email: profile.email,
                    bio: profile.bio,
                }),
                credentials: 'include',
            });
            if (response.status === 401) {
                setError('Session expired. Please log in again.');
                navigate('/login');
                return;
            }
            if (response.ok) {
                localStorage.setItem('userProfile', JSON.stringify(profile));
                login({ ...profile });
                navigate('/profile');
            } else {
                const data = await response.json();
                setError(data.error || 'Failed to update profile');
            }
        } catch (err) {
            setError('Server error');
            console.error('Save profile failed:', err);
        }
    };

    // Reset form
    const handleReset = () => {
        setProfile({ name: "", email: "", bio: "", avatar_url: profile.avatar_url });
        setPreview(profile.avatar_url);
    };

    return (
        <div className="profile-page">
            <h1>Edit Profile</h1>
            {error && <p className="error">{error}</p>}
            <div className="profile-form">
                <div className="form-group">
                    <label>Avatar</label>
                    <input
                        type="file"
                        accept="image/png,image/jpeg,image/gif"
                        onChange={handleAvatarUpload}
                    />
                    {preview && (
                        <img
                            src={preview}
                            alt="Avatar Preview"
                            className="avatar-preview"
                            loading="lazy"
                        />
                    )}
                </div>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={profile.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                    />
                </div>
                <div className="form-group">
                    <label>Bio</label>
                    <textarea
                        name="bio"
                        value={profile.bio}
                        onChange={handleChange}
                        placeholder="Tell us about yourself"
                        rows="4"
                    />
                </div>
                <div className="form-actions">
                    <button onClick={handleSave} className="save-button">Save</button>
                    <button onClick={() => navigate('/profile')} className="cancel-button">Cancel</button>
                    <button onClick={handleReset} className="reset-button">Reset</button>
                </div>
            </div>
        </div>
    );
}

export default EditProfilePage;