import React, { useState, useContext } from "react";
import './AccountSetting.css';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';
import Sidebar from '../components/Sidebar';

const BASE_URL = 'http://localhost:5000';

function AccountSettings() {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [pError, setpError] = useState('');
    const [eError, seteError] = useState('');
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    // Update email
    const handleUpdateEmail = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await fetch(`${BASE_URL}/api/users/update-email`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
                credentials: 'include',
            });
            if (response.status === 401) {
                seteError('Session expired. Please log in again.');
                navigate('/login');
                return;
            }
            if (response.ok) {
                setEmail('');
                seteError('Email updated successfully');
            } else {
                const data = await response.json();
                seteError(data.error || 'Failed to update email');
            }
        } catch (err) {
            seteError('Server error');
            console.error('Update email failed:', err);
        }
    };

    // Change password
    const handleChangePassword = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await fetch(`${BASE_URL}/api/users/change-password`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ currentPassword, newPassword }),
                credentials: 'include',
            });
            if (response.status === 401) {
                setpError('Incorrect password. Please enter your correct current password.');
                return;
            }
            if (response.ok) {
                setCurrentPassword('');
                setNewPassword('');
                setpError('Password changed successfully');
            } else {
                const data = await response.json();
                setpError(data.error || 'Failed to change password');
            }
        } catch (err) {
            setpError('Server error');
            console.error('Change password failed:', err);
        }
    };

    // Delete profile
    const handleDelete = async () => {
        setError('');
        try {
            const response = await fetch(`${BASE_URL}/api/users/delete`, {
                method: 'DELETE',
                credentials: 'include',
            });
            if (response.ok) {
                localStorage.removeItem('userProfile');
                logout();
                navigate('/login');
            } else {
                setError('Failed to delete profile');
            }
        } catch (err) {
            setError('Server error');
            console.error('Delete profile failed:', err);
        }
    };

    const confirmDelete = () => {
        const isConfirmed = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
        if (isConfirmed) {
            handleDelete();
        }
    };

    return (
        <div>
            <Header />
            <div className="settings-container">
                <Sidebar />
                <div className="settings-content">
                    <div className="settings-page">
                        <h1>Account Settings</h1>
                        {error && <p className="error">{error}</p>}
                        <div className="settings-section">
                            <h2>Edit Email</h2>
                            <form onSubmit={handleUpdateEmail} className="settings-form">
                                <div className="form-group">
                                    <label>New Email</label>
                                    <input
                                        type="text"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter new email"
                                        className="form-input"
                                        required
                                    />
                                </div>
                                {eError && <p className="e_error">{eError}</p>}
                                <div className="settings-actions">
                                    <button type="submit" className="save-button">Update Email</button>
                                </div>
                            </form>
                        </div>
                        <div className="settings-section">
                            <h2>Change Password</h2>
                            <form onSubmit={handleChangePassword} className="settings-form">
                                <div className="form-group">
                                    <label>Current Password</label>
                                    <input
                                        type="password"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        placeholder="Enter current password"
                                        className="form-input"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>New Password</label>
                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="Enter new password"
                                        className="form-input"
                                        required
                                    />
                                </div>
                                {pError && <p className="p_error">{pError}</p>}
                                <div className="settings-actions">
                                    <button type="submit" className="save-button">Change Password</button>
                                </div>
                            </form>
                        </div>
                        <div className="settings-section">
                            <h2>Delete Account</h2>
                            <p className="warning-text">
                                Warning: This action cannot be undone. Deleting your account will permanently remove all your data.
                            </p>
                            <div className="settings-actions">
                                <button onClick={confirmDelete} className="delete-button_p">Delete Account</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default AccountSettings;