// ItineraryPage1.js
import React from 'react';
import './Itenarypage.css';

const itineraryData = [
  {
    day: "Day 1",
    title: "Travel to Pokhara",
    activities: [
      "Drive or flight from Kathmandu to Pokhara",
      "Check-in at hotel near Phewa Lake",
      "Evening lakeside walk and dinner",
    ],
  },
  {
    day: "Day 2",
    title: "Journey to Jomsom",
    activities: [
      "Morning flight to Jomsom",
      "Explore local market",
    ],
  },
  {
    day: "Day 3",
    title: "Visit Muktinath Temple",
    activities: [
      "Drive or hike to Muktinath Temple",
      "Holy bath at 108 water sprouts",
      "Return to Jomsom",
    ],
  },
  {
    day: "Day 4",
    title: "Back to Pokhara",
    activities: [
      "Fly to Pokhara from Jomsom",
      "Leisure time at Lakeside",
    ],
  },
  {
    day: "Day 5",
    title: "Return to Kathmandu",
    activities: [
      "Drive or flight to Kathmandu",
      "Hotel check-in",
      "Farewell dinner",
    ],
  },
];

function ItineraryPage1() {
  return (
    <div className="itinerary-container">
      <h1 className="itinerary-title">Itinerary Page 1: Muktinath Temple Tour</h1>
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
    </div>
  );
}

export default ItineraryPage1;
