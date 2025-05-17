import React, { useState, useEffect, useContext } from "react";
import './ProfileStyle.css';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';
import Sidebar from '../components/Sidebar';

const BASE_URL = 'http://localhost:5000';

function ProfilePage() {
    const { isAuthenticated, user, login, loading } = useContext(AuthContext);
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        name: "",
        email: "",
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
                        email: userData.email,
                        bio: userData.bio || '',
                        avatar_url: fullAvatarURL,
                    });
                    setPreview(fullAvatarURL);
                    login({ ...userData, avatar_url: fullAvatarURL });
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
    }, [isAuthenticated, login, navigate, loading]);

    if (loading) {
        return <div className="loading_p">Loading...</div>;
    }

    return (
        <div>
            <Header />
            <div className="profile-container_p">
                <Sidebar />
                <div className="profile-content_p">
                    <div className="profile-page_p">
                        <h1>User Profile</h1>
                        {error && <p className="error_p">{error}</p>}
                        <div className="profile-details_p">
                            <div className="detail-item_p">
                                <h2>Avatar</h2>
                                {profile.avatar_url ? (
                                    <img
                                        src={profile.avatar_url}
                                        alt="User Avatar"
                                        className="avatar_p"
                                        loading="lazy"
                                    />
                                ) : (
                                    <p>Not set</p>
                                )}
                            </div>
                            <div className="detail-item_p">
                                <h2>Name</h2>
                                <p>{profile.name || "Not set"}</p>
                            </div>
                            <div className="detail-item_p">
                                <h2>Email</h2>
                                <p>{profile.email || "Not set"}</p>
                            </div>
                            <div className="detail-item_p">
                                <h2>Bio</h2>
                                <p>{profile.bio || "Not set"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ProfilePage;