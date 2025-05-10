import React from 'react';
import GuideCard from './GuideCard';
import './GuidesSection.css';
import { Link } from 'react-router-dom';
import Guide1Image from "../pages/images/guide1.jpg"; 
import Guide2Image from "../pages/images/guide2.jpg"; 
import Guide3Image from "../pages/images/guide3.jpg"; 
import Guide4Image from "../pages/images/guide4.jpeg";

function GuidesSection() {
  const mockGuides = [
    {
      _id: '1',
      name: 'Anish',
      description: 'Experienced trekking guide in the Annapurna region.',
      image: Guide1Image,
      phone: '+977 9851098234',
      expertise: 'Trekking, Mountaineering',
      rating: 4.8,
    },
    {
      _id: '2',
      name: 'Swarnim',
      description: 'Specializes in cultural tours of the Kathmandu Valley.',
      image: Guide2Image,
      phone: '+977 9822374890',
      expertise: 'Cultural Tours, Heritage Walks',
      rating: 4.5,
    },
    {
      _id: '3',
      name: 'Pratik',
      description: 'Knowledgeable about local history and traditions.',
      image: Guide3Image,
      phone: '+977 9841893011',
      expertise: 'History, Local Culture, Food Tours',
      rating: 4.9,
    },
    {
    _id: '4',
    name: 'Supriya',
    description: 'Passionate about sharing the beauty of the Himalayas.',
    image: Guide4Image,
    phone: '+977 9841390988',
    expertise: 'Trekking, Nature Walks, Bird Watching',
    rating: 4.7,
  },
  ];

  return (
    <section className="guides-section">
      <h2>Meet Our Expert Guides</h2>
      <div className="guide-list">
        {mockGuides.map(guide => (
          <GuideCard key={guide._id} guide={guide} />
        ))}
      </div>
      {mockGuides.length > 0 && (
        <div className="view-all-button">
          <Link to="/guides">View All Guides</Link>
        </div>
      )}
    </section>
  );
}

export default GuidesSection;