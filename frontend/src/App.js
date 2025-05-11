import React from 'react';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Homepage from './pages/Homepage';
import ForgotPassword from './pages/forget-password';
import ResetPassword from './pages/reset-password';
import { AuthProvider } from './context/AuthContext';
import ProfilePage from './pages/ProfilePage';
import ItineraryPage1 from './components/ItineraryPage1';
import ItineraryPage2 from './components/ItineraryPage2';
import ItineraryPage3 from './components/ItineraryPage3';
import GuidesPage from './pages/GuidesPage';
import GuideDetailsPage from './pages/GuideDetailsPage'; 
import EditProfilePage from './pages/editProfile';

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
          <Route path="/itinerary" element={<ItineraryPage1 />} />
          <Route path="/itinerary2" element={<ItineraryPage2 />} />
          <Route path="/itinerary3" element={<ItineraryPage3 />} />
          <Route path="/guides" element={<GuidesPage />} />
          <Route path="/guides/:id" element={<GuideDetailsPage />} /> 
          <Route path="/edit-profile" element={<EditProfilePage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
export default App