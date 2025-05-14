import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';
import './GuideDetailsPage.css';

import Guide1Image from "../pages/images/guide1.jpg";
import Guide2Image from "../pages/images/guide2.jpg";
import Guide3Image from "../pages/images/guide3.jpg";
import Guide4Image from "../pages/images/guide4.jpeg";


function GuideDetailsPage() {
  const { id } = useParams();
  const [guide, setGuide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const profileImages = {
    '1': Guide1Image,
    '2': Guide2Image,
    '3': Guide3Image,
    '4': Guide4Image,
  };

  useEffect(() => {
    console.log('Guide ID:', id);

    const fetchGuideDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/guides/${id}`);
        console.log('Fetch Response:', response);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetch Data:', data);
        setGuide(data.guide);
        setLoading(false);
      } catch (error) {
        setError('Failed to load guide details.');
        console.error('Error fetching guide details:', error);
        setLoading(false);
      }
    };

    if (process.env.NODE_ENV === 'development' && !process.env.REACT_APP_API_URL) {
      const mockGuides = [
        { _id: '1', name: 'Anish', description: 'Experienced trekking guide in the Annapurna region.', image: 'anish.jpg', phone: '+977 9851098234', expertise: 'Trekking, Mountaineering', rating: 4.8, longDescription: 'Anish has been guiding in the Annapurna region for over 10 years and is passionate about sharing the beauty of the Himalayas.Embark on an unforgettable journey through the breathtaking Annapurna region with Anish, a seasoned guide whose passion for the majestic Himalayas is infectious.With over a decade of experience navigating these trails, Anish offers more than just a trek; he provides a deep connection to the landscape and a wealth of knowledge about the local culture and environment.Expect insightful stories, well-paced itineraries, and a genuine love for sharing the beauty of his homeland.' },
        { _id: '2', name: 'Swarnim', description: 'Specializes in cultural tours of the Kathmandu Valley.', image: 'swarnim.jpg', phone: '+977 9822374890', expertise: 'Cultural Tours, Heritage Walks', rating: 4.5, longDescription: 'Swarnim\'s passion for the culture and history of Kathmandu Valley shines through in his informative and engaging tours.Discover the captivating soul of the Kathmandu Valley with Swarnim, a guide whose enthusiasm for its rich cultural tapestry and historical significance truly shines. Wander through ancient alleyways, marvel at intricately carved temples, and unlock the secrets of centuries-old traditions under his expert tutelage. ' },
        { _id: '3', name: 'Pratik', description: 'Knowledgeable about local history and traditions.', image: 'pratik.jpg', phone: '+977 9841893011', expertise: 'History, Local Culture, Food Tours', rating: 4.9, longDescription: 'Pratik\'s deep understanding of local lore and cuisine makes his tours a truly immersive experience.Delve into the authentic flavors, captivating history, and vibrant local culture of the region with a guide who offers a truly immersive experience.More than just pointing out landmarks, Pratik weaves together the stories of the past with the present-day traditions, offering a unique perspective on the local way of life.With Pratik, prepare for insightful conversations, unexpected discoveries, and a journey that engages all your senses, leaving you with a genuine appreciation for the heart and soul of the place. ' },
        { _id: '4', name: 'Supriya', description: 'Passionate about sharing the beauty of the Himalayas.', image: 'supriya.jpeg', phone: '+977 9841390988', expertise: 'Trekking, Nature Walks, Bird Watching', rating: 4.6, longDescription: 'Immerse yourself in the serene beauty and natural wonders of the Nepalese landscape with Supriya, a guide whose passion for the outdoors is truly inspiring.  Whether you\'re trekking through verdant trails, observing the diverse birdlife, or simply soaking in the tranquility of nature, Supriya\'s keen eye and extensive knowledge will enhance your experience.With Supriya, expect a refreshing and rejuvenating journey that highlights the incredible biodiversity and scenic splendor of the region.' },

      ];
      const foundGuide = mockGuides.find(g => g._id === id);
      console.log('Mock data - foundGuide:', foundGuide); 
      setGuide(foundGuide);
      setLoading(false);
    } else {
      fetchGuideDetails();
    }
  }, [id]);

  console.log('Guide state:', guide, 'Loading state:', loading, 'Error state:', error); 

  if (loading) {
    return <div>Loading guide details...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!guide) {
    return <div>Guide not found.</div>;
  }

  return (
    <div>
      <Header />
      <div className="guide-details-container">
        <div className="guide-profile">
          <img
            src={profileImages[guide._id]}
            alt={guide.name}
            className="guide-details-img"
          />
          <h1>{guide.name}</h1>
          <p className="guide-expertise">Expertise: {guide.expertise}</p>
          <p>Phone: {guide.phone}</p>
        </div>
        <div className="guide-description">
          <h2>About {guide.name}</h2>
          <p>{guide.longDescription}</p>
        </div>
        <button className="book-session-button">Book a Session</button>
      </div>
      <Footer />
    </div>
  );
}

export default GuideDetailsPage;