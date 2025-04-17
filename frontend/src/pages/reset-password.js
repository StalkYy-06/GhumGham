import React, { useState, useEffect } from 'react';
import './Login.css';
import { Link, useSearchParams } from 'react-router-dom';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [searchParams] = useSearchParams();
    const email = searchParams.get('email');
    const token = searchParams.get('token');

    useEffect(() => {
        if (!email || !token) {
            setError('Invalid reset link');
        }
    }, [email, token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setPasswordError(false);

        if (!email || !token) {
            setError('Invalid reset link');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setPasswordError(true);
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/users/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, token, password, confirmPassword }),
            });

            const contentType = response.headers.get('Content-Type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Server returned an invalid response');
            }

            const data = await response.json();

            if (!response.ok) {
                if (data.error.includes('Password') || data.error === 'Invalid or expired token') {
                    setPasswordError(true);
                }
                throw new Error(data.error || 'Failed to reset password');
            }

            setSuccess('Password reset successfully');
        } catch (err) {
            setError(err.message);
            console.error('Reset password error:', err);
        }
    };

    return (
        <div className="container">
            <Link to="/">
                <img src="/logo.png" alt="Ghumnajam Logo" className="logo_l" />
            </Link>
            <div className="form-box">
                <h2>Reset Password</h2>
                <p>Enter your new password</p>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="New Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={passwordError ? 'input-error' : ''}
                        />
                        <img src="lock.png" alt="lock" className="lock" />
                        {showPassword ? (
                            <img
                                src="v_on.png"
                                alt="v_on"
                                className="on"
                                onClick={() => setShowPassword(false)}
                            />
                        ) : (
                            <img
                                src="v_off.png"
                                alt="v_off"
                                className="off"
                                onClick={() => setShowPassword(true)}
                            />
                        )}
                    </div>
                    <div className="input-group">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={passwordError ? 'input-error' : ''}
                        />
                        <img src="lock.png" alt="lock" className="lock" />
                        {showPassword ? (
                            <img
                                src="v_on.png"
                                alt="v_on"
                                className="on"
                                onClick={() => setShowPassword(false)}
                            />
                        ) : (
                            <img
                                src="v_off.png"
                                alt="v_off"
                                className="off"
                                onClick={() => setShowPassword(true)}
                            />
                        )}
                    </div>
                    {error && <p className="error">{error}</p>}
                    {success && <p className="success">{success}</p>}
                    <button type="submit" className="primary-btn">Reset Password</button>
                </form>
                <p>
                    Back to <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default ResetPassword;