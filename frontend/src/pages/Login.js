import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Handle local signup submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:5000/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include'
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Login Failed");
            }

            console.log('Login Successful:', data);
            navigate('/');
        } catch (err) {
            setError(err.message);
            console.error('Login error:', err);
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:5000/auth/google";
    };

    return (
        <div className="container">
            <Link to="/">
                <img src="logo.png" alt="Ghumnajam Logo" className="logo_l" />
            </Link>
            <div className="form-box">

                <h2>Sign up to <br></br>Ghumnajam</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <p className="forgot-password">Forgot password?</p>
                    <button type="submit" className="primary-btn">Sign up</button>
                    <div className="divider">
                        <span>or</span>
                    </div>
                    <button type="button" className="google-btn" onClick={handleGoogleLogin}>
                        <img src="google-icon.png" alt="Google Icon" /> Continue with Google
                    </button>
                </form>
                <p className="terms">
                    By proceeding, you agree to our <span>Terms of Use</span> and confirm you have read our <span>Privacy and Cookie Statement</span>.
                </p>
                <p className="recaptcha">
                    This site is protected by reCAPTCHA and the Google <span>Privacy Policy</span> and <span>Terms of Service</span> apply.
                </p>
            </div>
        </div>
    );
};

export default Login;
