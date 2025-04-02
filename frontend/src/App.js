import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Homepage from './pages/Homepage';

function App() {
  return (
    <Router>
      {/* Navigation Links */}
      <nav style={{ position: 'absolute', top: '20px', right: '20px' }}>
        <Link to="/register">Register</Link>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path='/Login' element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;