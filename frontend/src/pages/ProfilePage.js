import React, { useState, useEffect, useContext } from "react";
import './ProfileStyle.css';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
    const { isAuthenticated, user, login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        bio: "",
        avatar_url: "",
    });
    const [isEditing, setIsEditing] = useState(false);
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
                const response = await fetch('http://localhost:5000/api/profiles', {
                    credentials: 'include',
                });
                if (response.ok) {
                    const user = await response.json();
                    setProfile({
                        name: user.user.name,
                        email: user.user.email,
                        bio: user.user.bio || '',
                        avatar_url: user.user.avatar_url || '/uploads/default-avatar.png',
                    });
                    setPreview(user.user.avatar_url || '/uploads/default-avatar.png');
                    login(user.user);
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
            const response = await fetch('http://localhost:5000/api/users/upload-avatar', {
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
                setProfile({ ...profile, avatar_url: data.avatar_url });
                setPreview(data.avatar_url);
                login({ ...user, avatar_url: data.avatar_url }); // Update AuthContext
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
            const response = await fetch('http://localhost:5000/api/users/update', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: profile.name,
                    email: profile.name,
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
                setIsEditing(false);
                login({ ...profile });
            } else {
                const data = await response.json();
                setError(data.error || 'Failed to update profile');
            }
        } catch (err) {
            setError('Server error');
            console.error('Save profile failed:', err);
        }
    };

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
            setIsEditing(false);
            navigate('/login');
        } catch (err) {
            setError('Failed to delete profile');
            console.error('Delete profile failed:', err);
        }
    };

    // Reset form
    const handleReset = () => {
        setProfile({ name: "", email: "", bio: "", avatar_url: profile.avatar_url });
        setPreview(profile.avatar_url);
        setIsEditing(true);
    };

    return (
        <div className="profile-page">
            <h1>User Profile</h1>
            {error && <p className="error">{error}</p>}
            {isEditing ? (
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
                        <button onClick={() => setIsEditing(false)} className="cancel-button">Cancel</button>
                        <button onClick={handleReset} className="reset-button">Reset</button>
                    </div>
                </div>
            ) : (
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
                        <button onClick={() => setIsEditing(true)} className="edit-button">Edit Profile</button>
                        <button onClick={handleDelete} className="delete-button">Delete Profile</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProfilePage;