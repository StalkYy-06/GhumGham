import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Homepage from './pages/Homepage';
import ForgotPassword from './pages/forget-password';
import ResetPassword from './pages/reset-password';
import { AuthProvider } from './context/AuthContext';
import ProfilePage from './pages/ProfilePage';
import ItineraryPage1 from './pages/ItineraryPage1';
import ItineraryPage2 from './pages/ItineraryPage2';
import ItineraryPage3 from './pages/ItineraryPage3';
import GuidesPage from './pages/GuidesPage';
import GuideDetailsPage from './pages/GuideDetailsPage';
import EditProfilePage from './pages/editProfile';
import About from './pages/About';
import BlogCategoryPage from './pages/BlogCategoryPage';
import AdventureCategoryPage from './pages/AdventureCategoryPage';
import FoodCategoryPage from './pages/FoodCategoryPage';
import NatureCategoryPage from './pages/NatureCategoryPage';
import BlogPostPage from './pages/BlogPostPage';
import CommentSection from './components/commentSection';
import DestinationsList from './pages/destinationsList';
import Destinations from './pages/destinations';
import EditDestinations from './pages/editDestinations';
import AddDestinations from './pages/addDestinations';



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
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<BlogCategoryPage />} /> {/* Main blog page with categories */}
          <Route path="/category/adventure" element={<AdventureCategoryPage />} /> {/* Adventure post previews */}
          <Route path="/category/food" element={<FoodCategoryPage />} /> {/* Food post previews */}
          <Route path="/category/nature" element={<NatureCategoryPage />} /> {/* Nature post previews */}
          <Route path="/blog/:slug" element={<BlogPostPage />} /> {/* Route for individual blog posts */}
          <Route path="/commentSection" element={<CommentSection />} />
          <Route path="/destinations" element={<DestinationsList />} />
          <Route path="/destinations/:id" element={< Destinations />} />
          <Route path="/editDestinations/:id" element={< EditDestinations />} />
          <Route path="/addDestinations" element={< AddDestinations />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;