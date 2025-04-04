import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [userError, setUserError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setUserError(false)
    setEmailError(false);
    setPasswordError(false);

    if (!email || !name || !password) {
      if (!email) setEmailError(true);
      if (!name) setUserError(true);
      if (!password) setPasswordError(true);
      setError('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name, password }),
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

        if (data.error === 'Username Already Exists') {
          setEmailError(true);
        } else if (data.error === 'Invalid Email') {
          setPasswordError(true);
        } else if (data.error === 'Email Already Registered') {
          setEmailError(true);
        }
        else if (data.error.includes('Password')) {
          setUserError(true);
        }
        throw new Error(data.error || 'Registration failed');
      }

      console.log('Registration Successful:', data);
      navigate('/');

    } catch (err) {
      setError(err.message);
      console.error('Registration error:', err);
    }
  };

  //register using google
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <div className="container">
      <Link to="/">
        <img src="/logo.png" alt="Ghumnajam Logo" className="logo_l" />
      </Link>
      <div className="form-box">

        <h2>Welcome to Ghumnajam!</h2>
        <p>Register to create your first account and start exploring</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Username"
              value={name}
              onChange={(e) => setUsername(e.target.value)}
              className={userError ? 'input-error' : ''}
            />
            <img src="user.png" alt="user" className="user" />
          </div>
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
          <button type="submit" className="primary-btn">Register</button>
          <div className="divider">
            <span>or</span>
          </div>
          <button className="google-btn">
            <img src="/google-icon.png" alt="Google Icon" /> Continue with Google
          </button>
        </form>
      </div>
    </div>
  );
};

/* test user registered 
 username : TestUser
 mail : TestUser@gmail.com
 password : Testpassword220@
*/

export default Register;
