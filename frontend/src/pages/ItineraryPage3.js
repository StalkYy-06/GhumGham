// ItineraryPage3.js
import React from 'react';
import './Itenarypage.css';
import CommentSection from '../components/commentSection';
import Footer from '../components/footer.js';
import Header from '../components/header.js';

const itineraryData = [
  {
    day: "Day 1",
    title: "Drive to Besisahar",
    activities: [
      "Drive from Kathmandu to Besisahar",
      "Overnight stay",
    ],
  },
  {
    day: "Day 2–5",
    title: "Trek Through Villages",
    activities: [
      "Trek to Chame, Pisang, and Manang",
      "Explore Buddhist monasteries and culture",
    ],
  },
  {
    day: "Day 6–7",
    title: "Acclimatization & High Camp",
    activities: [
      "Rest and acclimatize in Manang",
      "Trek to Yak Kharka and Thorong Phedi",
    ],
  },
  {
    day: "Day 8",
    title: "Cross Thorong La Pass",
    activities: [
      "Trek early morning to Thorong La (5,416m)",
      "Descend to Muktinath",
    ],
  },
  {
    day: "Day 9–10",
    title: "Return to Pokhara",
    activities: [
      "Drive to Jomsom",
      "Fly to Pokhara and relax",
    ],
  },
];

function ItineraryPage3() {

  const itineraryId = 'Iti-3';

  return (
    <div>
      <Header />
      <div className="itinerary-container">
        <h1 className="itinerary-title">Itinerary Page 3: Annapurna Circuit Trek</h1>
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
    </div >
  );
}

export default ItineraryPage3;
