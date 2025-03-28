import React, { useState } from 'react';
import './styles.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ username, email, password });
  };

  return (
    <div className="container">
      <div className="form-box">
        <img src="/logo.png" alt="Ghumnajam Logo" className="logo" />
        <h2>Welcome to Ghumnajam!</h2>
        <p>Register to create your first account and start exploring</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input 
              type="text" 
              placeholder="Username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
          </div>
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
            <span className="input-hint">Must be at least 8 characters</span>
          </div>
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

export default Register;
