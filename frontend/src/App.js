import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Homepage from './pages/Homepage';
import ForgotPassword from './pages/forget-password';
import ResetPassword from './pages/reset-password';
import { AuthProvider } from './context/AuthContext';
import ProfilePage from './pages/ProfilePage';
import EditProfilePage from './pages/editProfile';
import About from './pages/About';
import BlogLandingPage from './pages/BlogLandingPage';
import BlogCategoryPage from './pages/BlogCategoryPage';  // Import BlogCategoryPage

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* Routes */}
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path='/Login' element={<Login />} />
          <Route path="/forget-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/edit-profile" element={<EditProfilePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<BlogLandingPage />} />

          {/* Add dynamic category route */}
          <Route path="/category/:categoryId" element={<BlogCategoryPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
