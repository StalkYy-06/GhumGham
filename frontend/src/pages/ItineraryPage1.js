import React, { useEffect } from 'react';
import '../components/Itenarypage.css';

import day1 from '../pages/images/pokhara.jpeg';
import day2 from '../pages/images/Jomsom.jpg';
import day3 from '../pages/images/muktinath.jpg';
import day4 from '../pages/images/ReturntoPokhara.jpg';
import day5 from '../pages/images/Returntokathmandu.jpg';

import CommentSection from '../components/commentSection.js';
import Footer from '../components/footer.js';
import Header from '../components/header.js';

function ItineraryPage1() {
    const itineraryId = 'Iti-1';
    useEffect(() => {
        document.body.className = 'itinerary-page-1';
        return () => {
            document.body.className = '';
        };
    }, []);

    return (
        <>
            <Header />
            <div className="itinerary-container">
                <h1 className="itinerary-title">TRIP ITINERARY: MUKTINATH TEMPLE</h1>
                <div className="itinerary-header-details">
                    <div><strong>Destination:</strong> Muktinath Temple</div>
                    <div><strong>Duration:</strong> 5 Days</div>
                </div>

                <div className="itinerary-day">
                    <img src={day1} alt="Day 1 - Pokhara" className="day-image" />
                    <div className="day-details">
                        <h2 className="day-heading">Day 1: Travel to Pokhara</h2>
                        <p><strong>Morning:</strong> Depart from Kathmandu to Pokhara by drive or flight and enjoy scenic views along the way.</p>
                        <p><strong>Afternoon:</strong> Check-in at a hotel near Phewa Lake.</p>
                        <p><strong>Evening:</strong> Enjoy a lakeside walk and local dinner.</p>
                    </div>
                </div>

                <div className="itinerary-day">
                    <img src={day2} alt="Day 2 - Jomsom" className="day-image" />
                    <div className="day-details">
                        <h2 className="day-heading">Day 2: Journey to Jomsom</h2>
                        <p><strong>Morning:</strong> Morning flight to Jomsom.</p>
                        <p><strong>Afternoon:</strong> Explore local market.</p>
                    </div>
                </div>

                <div className="itinerary-day">
                    <img src={day3} alt="Day 3 - Muktinath" className="day-image" />
                    <div className="day-details">
                        <h2 className="day-heading">Day 3: Visit Muktinath Temple</h2>
                        <p><strong>Morning:</strong> Drive or hike to Muktinath Temple.</p>
                        <p><strong>Afternoon:</strong> Holy bath at 108 water sprouts.</p>
                        <p><strong>Evening:</strong> Return to Jomsom.</p>
                    </div>
                </div>

                <div className="itinerary-day">
                    <img src={day4} alt="Day 4 - Back to Pokhara" className="day-image" />
                    <div className="day-details">
                        <h2 className="day-heading">Day 4: Back to Pokhara</h2>
                        <p><strong>Morning:</strong> Fly to Pokhara from Jomsom.</p>
                        <p><strong>Afternoon:</strong> Leisure time at Lakeside.</p>
                    </div>
                </div>

                <div className="itinerary-day">
                    <img src={day5} alt="Day 5 - Return to Kathmandu" className="day-image" />
                    <div className="day-details">
                        <h2 className="day-heading">Day 5: Return to Kathmandu</h2>
                        <p><strong>Morning:</strong> Drive or flight to Kathmandu.</p>
                        <p><strong>Afternoon:</strong> Hotel check-in.</p>
                        <p><strong>Evening:</strong> Farewell dinner.</p>
                    </div>
                </div>
                <CommentSection itineraryId={itineraryId} />
            </div>
            <Footer />
        </>
    );
}

export default ItineraryPage1;
