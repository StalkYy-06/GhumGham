import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom'; // Used for redirect
import { AuthContext } from '../context/AuthContext'; // Importing auth context

// PrivateRoute component to protect routes
function PrivateRoute({ children }) {
    const { isAuthenticated } = useContext(AuthContext); // Get auth status from context

    // If user is authenticated, render the child components
    // Otherwise, redirect to login
    return isAuthenticated ? children : <Navigate to="/login" />;
}

export default PrivateRoute; // Export component
