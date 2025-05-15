import React, { useState, useContext } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    // Handle local login submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setEmailError(false);
        setPasswordError(false);

        if (!email || !password) {
            if (!email) setEmailError(true);
            if (!password) setPasswordError(true);
            setError('Please fill in all fields');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include'
            });

            //check if response is JSON
            const contentType = response.headers.get('Content-Type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Server returned an invalid response');
            }

            const data = await response.json();
            console.log("Response data:", data);

            if (!response.ok) {
                if (data.error === 'Invalid Email or password') {
                    setEmailError(true);
                    setPasswordError(true);
                    setError('Invalid email or password');
                }
                throw new Error(data.error || 'Login failed');
            }

            login(data.user);
            console.log('Login Successful:', data);
            navigate('/');
        } catch (err) {
            setError(err.message);
            console.error('Login error:', err);
        }
    };

    //handle google login
    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:5000/auth/google";
    };

    return (
        <div className="container">
            <Link to="/">
                <img src="logo.png" alt="Ghumnajam Logo" className="logo_l" />
            </Link>
            <div className="form-box">

                <h2>Log in to <br></br>Ghumnajam</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={emailError ? 'input-error' : ''}
                        />
                        <img src="mail.png" alt="mail" className="mail" />
                    </div>
                    <div className="input-group">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={passwordError ? 'input-error' : ''}
                        />
                        <img src="lock.png" alt="lock" className="lock" />

                        {showPassword ? (
                            <img src="v_on.png"
                                alt="v_on"
                                className="on"
                                onClick={() => setShowPassword(false)}
                            />
                        ) : (
                            <img src="v_off.png"
                                alt="v_off"
                                className="off"
                                onClick={() => setShowPassword(true)}
                            />
                        )}

                    </div>
                    {error && <p className="error_l">{error}</p>}
                    <div className='forgot-password'>
                        <Link to="/forget-password">
                            <p>Forgot password?</p>
                        </Link>
                    </div>
                    <button type="submit" className="primary-btn">Log in</button>
                    <div className="divider">
                        <span>or</span>
                    </div>
                    <button type="button" className="google-btn" onClick={handleGoogleLogin}>
                        <img src="google-icon.png" alt="Google Icon" /> Continue with Google
                    </button>
                </form>

                <p className="register">
                    New to Ghumnajam? <span><Link to="/register">Register.</Link></span>
                </p>

                <p className="terms">
                    By proceeding, you agree to our <span>Terms of Use</span> and confirm you have read our <span>Privacy and Cookie Statement</span>.
                </p>
            </div>
        </div>
    );
};

export default Login;
