import React, { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [emailError, setEmailError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setEmailError(false);

        try {
            const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const contentType = response.headers.get('Content-Type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Server returned an invalid response');
            }

            const data = await response.json();

            if (!response.ok) {
                if (data.error === 'Invalid email format' || data.error === 'Email is required') {
                    setEmailError(true);
                }
                throw new Error(data.error || 'Failed to send reset email');
            }

            setSuccess(data.message); // Handles both "Password reset email sent" and generic message
        } catch (err) {
            setError(err.message);
            console.error('Forgot password error:', err);
        }
    };

    return (
        <div className="container">
            <Link to="/">
                <img src="/logo.png" alt="Ghumnajam Logo" className="logo_l" />
            </Link>
            <div className="form-box">
                <h2>Forgot Password</h2>
                <p>Enter your email to receive a password reset link</p>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={emailError ? 'input-error' : ''}
                        />
                        <img src="mail.png" alt="mail" className="mail" />
                    </div>
                    {success && <p className="success">{success}</p>}
                    {error && <p className="error_l">{error}</p>}
                    <button type="submit" className="primary-btn">Send Reset Link</button>
                </form>
                <p>
                    Back to <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;