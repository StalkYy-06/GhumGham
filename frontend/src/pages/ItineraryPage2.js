// ItineraryPage2.js
import React from 'react';
import './Itenarypage.css';
import CommentSection from '../components/commentSection';
import Footer from '../components/footer.js';
import Header from '../components/header.js';

const itineraryData = [
  {
    day: "Day 1",
    title: "Fly to Lukla, Trek to Phakding",
    activities: [
      "Flight from Kathmandu to Lukla (2,840m)",
      "Trek to Phakding (2,610m)",
    ],
  },
  {
    day: "Day 2",
    title: "Trek to Namche Bazaar",
    activities: [
      "Trek through forest trails and suspension bridges",
      "Arrive in Namche Bazaar (3,440m)",
    ],
  },
  {
    day: "Day 3",
    title: "Acclimatization in Namche",
    activities: [
      "Short hike to Everest View Hotel",
      "Explore Namche Bazaar",
    ],
  },
  {
    day: "Day 4–7",
    title: "Trek Towards Base Camp",
    activities: [
      "Trek to Tengboche, Dingboche, Lobuche",
      "Visit monasteries and glaciers",
    ],
  },
  {
    day: "Day 8",
    title: "Reach Everest Base Camp",
    activities: [
      "Early morning trek to EBC (5,364m)",
      "View Khumbu Icefall",
      "Return to Gorakshep",
    ],
  },
  {
    day: "Day 9–12",
    title: "Return Journey",
    activities: [
      "Trek back to Lukla",
      "Fly to Kathmandu",
      "Celebration dinner",
    ],
  },
];

function ItineraryPage2() {

  const itineraryId = 'Iti-2';

  return (
    <div>
      <Header />
      <div className="itinerary-container">
        <h1 className="itinerary-title">Itinerary Page 2: Everest Base Camp Trek</h1>
        {itineraryData.map((day, index) => (
          <div key={index} className="itinerary-day">
            <h2 className="day-heading">{day.day}: {day.title}</h2>
            <ul className="activity-list">
              {day.activities.map((activity, idx) => (
                <li key={idx} className="activity-item">{activity}</li>
              ))}
            </ul>
          </div>
        ))}
        <CommentSection itineraryId={itineraryId} />
      </div>
      <Footer />
    </div>
  );
}

export default ItineraryPage2;
