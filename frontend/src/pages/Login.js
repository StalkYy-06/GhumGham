import React, { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ email, password });
    };

    return (
        <div className="container">
            <Link to="/">
                <img src="logo.png" alt="Ghumnajam Logo" className="logo_l" />
            </Link>
            <div className="form-box">

                <h2>Sign up to Ghumnajam</h2>
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
                    <button className="google-btn">
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
