import React, { useState, useEffect, useContext } from "react";
import './editProfile.css';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';
import Sidebar from '../components/Sidebar';

const BASE_URL = 'http://localhost:5000';

function EditProfilePage() {
    const { isAuthenticated, user, login, loading } = useContext(AuthContext);
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        name: "",
        bio: "",
        avatar_url: "",
    });
    const [error, setError] = useState('');
    const [preview, setPreview] = useState('');

    // Fetch profile from backend on mount
    useEffect(() => {
        const fetchProfile = async () => {
            if (!loading && !isAuthenticated) {
                navigate('/login');
                return;
            }

            try {
                const response = await fetch(`${BASE_URL}/api/users/profile`, {
                    credentials: 'include',
                });
                if (response.ok) {
                    const data = await response.json();
                    const userData = data.user || data;
                    const avatarPath = userData.avatar_url || '/uploads/default-avatar.png';
                    const fullAvatarURL = `${BASE_URL}${avatarPath}`;
                    setProfile({
                        name: userData.name,
                        bio: userData.bio || '',
                        avatar_url: fullAvatarURL,
                    });
                    setPreview(fullAvatarURL);
                } else {
                    setError('Failed to fetch profile');
                    if (!loading) navigate('/login');
                }
            } catch (err) {
                setError('Server error');
                console.error('Fetch profile failed:', err);
                if (!loading) navigate('/login');
            }
        };
        fetchProfile();
    }, [isAuthenticated, navigate, loading]);

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
        setProfile({ name: "", bio: "", avatar_url: profile.avatar_url });
        setPreview(profile.avatar_url);
    };

    if (loading) {
        return <div className="loading_e">Loading...</div>;
    }

    return (
        <div>
            <Header />
            <div className="profile-container_e">
                <Sidebar />
                <div className="profile-content_e">
                    <div className="profile-page_e">
                        <h1>Edit Profile</h1>
                        {error && <p className="error_e">{error}</p>}
                        <div className="profile-form_e">
                            <div className="form-group_e">
                                <label>Avatar</label>
                                <input
                                    type="file"
                                    accept="image/png,image/jpeg,image/gif"
                                    onChange={handleAvatarUpload}
                                    className="avatar-input_e"
                                />
                                {preview && (
                                    <img
                                        src={preview}
                                        alt="Avatar Preview"
                                        className="avatar-preview_e"
                                        loading="lazy"
                                    />
                                )}
                            </div>
                            <div className="form-group_e">
                                <label>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={profile.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    className="form-input_e"
                                />
                            </div>
                            <div className="form-group_e">
                                <label>Bio</label>
                                <textarea
                                    name="bio"
                                    value={profile.bio}
                                    onChange={handleChange}
                                    placeholder="Tell us about yourself"
                                    rows="4"
                                    className="form-textarea_e"
                                />
                            </div>
                            <div className="form-actions_e">
                                <button onClick={handleSave} className="save-button_e">Save</button>
                                <button onClick={() => navigate('/profile')} className="cancel-button_e">Cancel</button>
                                <button onClick={handleReset} className="reset-button_e">Reset</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default EditProfilePage;