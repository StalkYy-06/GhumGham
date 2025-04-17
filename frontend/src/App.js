<<<<<<< Updated upstream
// default js file (add code change the name whatever )
import React from 'react'

function App() {
  return (
    <div>

    </div>
  )
=======
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Homepage from './pages/Homepage';
import ForgotPassword from './pages/forget-password';
import ResetPassword from './pages/reset-password';

function App() {
  return (
    <Router>
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path='/Login' element={<Login />} />
        <Route path="/forget-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
>>>>>>> Stashed changes
}
export default App
