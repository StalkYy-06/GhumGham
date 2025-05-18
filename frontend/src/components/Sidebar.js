import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './SidebarStyle.css';

function Sidebar() {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to log out?')) {
            try {
                logout();
                localStorage.removeItem('userProfile');
                navigate('/login');
            } catch (err) {
                console.error('Logout failed:', err);
                alert('Failed to log out. Please try again.');
            }
        }
    };

    return (
        <div className="sidebar">
            <ul className="sidebar-nav">
                <li>
                    <button onClick={() => navigate('/profile')} className="sidebar-link">Profile</button>
                </li>
                <li>
                    <button onClick={() => navigate('/edit-profile')} className="sidebar-link">Edit Profile</button>
                </li>
                <li>
                    <button onClick={() => navigate('/bookings')} className="sidebar-link">Bookings</button>
                </li>
                <li>
                    <button onClick={() => navigate('/account-settings')} className="sidebar-link">Account Settings</button>
                </li>
                <li>
                    <button onClick={handleLogout} className="sidebar-link logout-button">Logout</button>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;