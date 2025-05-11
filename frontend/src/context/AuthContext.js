import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const login = async (userData) => {
        try {
            setError(null);
            setIsAuthenticated(true);
            setUser(userData);
            // Store minimal user data in localStorage for persistence
            localStorage.setItem('userProfile', JSON.stringify({
                id: userData.id,
                name: userData.name,
                email: userData.email
            }));
        } catch (err) {
            setError('Failed to login');
            console.error('Login error:', err);
            throw err;
        }
    };

    const logout = async () => {
        try {
            setError(null);
            const response = await fetch(`${API_URL}/api/auth/logout`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Logout failed');
            }

            setIsAuthenticated(false);
            setUser(null);
            localStorage.removeItem('userProfile');
        } catch (err) {
            setError('Failed to logout');
            console.error('Logout error:', err);
            throw err;
        }
    };

    const checkAuth = async () => {
        try {
            setError(null);
            const response = await fetch(`${API_URL}/api/profiles`, {
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                await login(data.user);
            } else {
                // If the session is invalid, clear everything
                setIsAuthenticated(false);
                setUser(null);
                localStorage.removeItem('userProfile');
            }
        } catch (err) {
            setError('Failed to check authentication');
            console.error('Auth check error:', err);
            setIsAuthenticated(false);
            setUser(null);
            localStorage.removeItem('userProfile');
        } finally {
            setLoading(false);
        }
    };

    // Check authentication status on mount
    useEffect(() => {
        checkAuth();
    }, []);

    // Clear error after 5 seconds
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const value = {
        isAuthenticated,
        user,
        login,
        logout,
        loading,
        error,
        checkAuth // Expose checkAuth for manual refresh
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};