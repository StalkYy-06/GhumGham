import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    const login = (userData) => {
        setIsAuthenticated(true);
        setUser(userData);
        localStorage.setItem("userProfile", JSON.stringify(userData));
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem("userProfile");
        fetch('http://localhost:5000/api/users/logout', {
            method: 'POST',
            credentials: 'include',
        }).catch(err => console.error('Logout error:', err));
    };

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/profiles', {
                    credentials: 'include',
                });
                if (response.ok) {
                    const userData = await response.json();
                    login(userData.user);
                }
            } catch (err) {
                console.error('Session check failed:', err);
            }
        };
        checkSession();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};