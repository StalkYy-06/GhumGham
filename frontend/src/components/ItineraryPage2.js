import React, { useEffect } from 'react';
import '../components/Itenarypage.css';

import day1 from '../pages/images/lukla.jpg';
import day2 from '../pages/images/namche.jpg';
import day3 from '../pages/images/AcclimatizationinNamche.jpg';
import day4to7 from '../pages/images/trek.jpeg';
import day8 from '../pages/images/basecamp.jpeg';
import day9to12 from '../pages/images/returntrek.jpeg';

function ItineraryPage2() {
    useEffect(() => {
        document.body.className = 'itinerary-page-2';
        return () => {
            document.body.className = '';
        };
    }, []);

    return (
        <div className="itinerary-container">
            <h1 className="itinerary-title">TRIP ITINERARY: EVEREST BASE CAMP TREK</h1>
            <div className="itinerary-header-details">
                <div><strong>Destination:</strong> Everest Base Camp</div>
                <div><strong>Duration:</strong> 12 Days</div>
            </div>

            <div className="itinerary-day">
                <img src={day1} alt="Day 1 - Lukla and Phakding" className="day-image" />
                <div className="day-details">
                    <h2 className="day-heading">Day 1: Fly to Lukla, Trek to Phakding</h2>
                    <p><strong>Morning:</strong> Fly to Lukla, enjoy the mountain views.</p>
                    <p><strong>Afternoon:</strong> Trek to Phakding along the Dudh Koshi River.</p>
                </div>
            </div>

            <div className="itinerary-day">
                <img src={day2} alt="Day 2 - Namche Bazaar" className="day-image" />
                <div className="day-details">
                    <h2 className="day-heading">Day 2: Trek to Namche Bazaar</h2>
                    <p><strong>Morning:</strong> Ascend through pine forests and suspension bridges.</p>
                    <p><strong>Afternoon:</strong> Reach Namche Bazaar and explore local market.</p>
                </div>
            </div>

            <div className="itinerary-day">
                <img src={day3} alt="Day 3 - Acclimatization at Namche" className="day-image" />
                <div className="day-details">
                    <h2 className="day-heading">Day 3: Acclimatization at Namche</h2>
                    <p><strong>All Day:</strong> Hike to Everest View Hotel or nearby ridges for panoramic views. Rest and prepare for altitude gain.</p>
                </div>
            </div>

            <div className="itinerary-day">
                <img src={day4to7} alt="Day 4 to 7 - Tengboche to Lobuche" className="day-image" />
                <div className="day-details">
                    <h2 className="day-heading">Day 4 to 7: Tengboche to Lobuche</h2>
                    <p><strong>Morning & Afternoon:</strong> Trek through Tengboche (famous monastery), Dingboche (acclimatization), and continue toward Lobuche, experiencing increasing altitudes and breathtaking landscapes.</p>
                </div>
            </div>

            <div className="itinerary-day">
                <img src={day8} alt="Day 8 - Everest Base Camp" className="day-image" />
                <div className="day-details">
                    <h2 className="day-heading">Day 8: Everest Base Camp</h2>
                    <p><strong>Morning:</strong> Trek from Gorak Shep to Everest Base Camp.</p>
                    <p><strong>Afternoon:</strong> Enjoy views of the Khumbu Icefall and surrounding peaks.</p>
                </div>
            </div>

            <div className="itinerary-day">
                <img src={day9to12} alt="Day 9 to 12 - Return Trek" className="day-image" />
                <div className="day-details">
                    <h2 className="day-heading">Day 9 to 12: Return to Lukla</h2>
                    <p><strong>Days 9–11:</strong> Trek back through Pheriche, Tengboche, Namche to Lukla.</p>
                    <p><strong>Day 12:</strong> Fly back to Kathmandu.</p>
                </div>
            </div>
        </div>
    );
}

export default ItineraryPage2;
