import React, { useEffect } from 'react';
import '../components/Itenarypage.css';

import day1 from '../pages/images/Besisahar.jpg';
import day2to5 from '../pages/images/trek.jpeg';
import day6to7 from '../pages/images/Acclimatization&HighCamp.jpeg';
import day8 from '../pages/images/thorong.jpeg';
import day9to10 from '../pages/images/ReturntoPokhara.jpg';

import CommentSection from '../components/commentSection.js';
import Footer from '../components/footer.js';
import Header from '../components/header.js';

function ItineraryPage3() {
    const itineraryId = 'Iti-3';
    useEffect(() => {
        document.body.className = 'itinerary-page-3';
        return () => {
            document.body.className = '';
        };
    }, []);

    return (
        <>
            <Header />
            <div className="itinerary-container">
                <h1 className="itinerary-title">TRIP ITINERARY: ANNAPURNA CIRCUIT TREK</h1>
                <div className="itinerary-header-details">
                    <div><strong>Destination:</strong> Annapurna Circuit</div>
                    <div><strong>Duration:</strong> 10 Days</div>
                </div>

                <div className="itinerary-day">
                    <img src={day1} alt="Day 1 - Besisahar" className="day-image" />
                    <div className="day-details">
                        <h2 className="day-heading">Day 1: Drive to Besisahar</h2>
                        <div className="session-block">
                            <strong>Morning:</strong>
                            <p>Drive from Kathmandu to Besisahar.</p>
                        </div>
                        <div className="session-block">
                            <strong>Evening:</strong>
                            <p>Overnight stay.</p>
                        </div>
                    </div>
                </div>

                <div className="itinerary-day">
                    <img src={day2to5} alt="Day 2–5 - Trek to Manang" className="day-image" />
                    <div className="day-details">
                        <h2 className="day-heading">Day 2–5: Trek Through Villages</h2>
                        <div className="session-block">
                            <strong>Days 2–5:</strong>
                            <p>Trek to Chame, Pisang, and Manang.</p>
                            <p>Explore Buddhist monasteries and culture.</p>
                        </div>
                    </div>
                </div>

                <div className="itinerary-day">
                    <img src={day6to7} alt="Day 6–7 - Acclimatization and High Camp" className="day-image" />
                    <div className="day-details">
                        <h2 className="day-heading">Day 6–7: Acclimatization & High Camp</h2>
                        <div className="session-block">
                            <strong>Day 6:</strong>
                            <p>Rest and acclimatize in Manang.</p>
                        </div>
                        <div className="session-block">
                            <strong>Day 7:</strong>
                            <p>Trek to Yak Kharka and Thorong Phedi.</p>
                        </div>
                    </div>
                </div>

                <div className="itinerary-day">
                    <img src={day8} alt="Day 8 - Thorong La Pass" className="day-image" />
                    <div className="day-details">
                        <h2 className="day-heading">Day 8: Cross Thorong La Pass</h2>
                        <div className="session-block">
                            <strong>Morning:</strong>
                            <p>Trek early morning to Thorong La (5,416m).</p>
                        </div>
                        <div className="session-block">
                            <strong>Afternoon:</strong>
                            <p>Descend to Muktinath.</p>
                        </div>
                    </div>
                </div>

                <div className="itinerary-day">
                    <img src={day9to10} alt="Day 9–10 - Return to Pokhara" className="day-image" />
                    <div className="day-details">
                        <h2 className="day-heading">Day 9–10: Return to Pokhara</h2>
                        <div className="session-block">
                            <strong>Day 9:</strong>
                            <p>Drive to Jomsom.</p>
                        </div>
                        <div className="session-block">
                            <strong>Day 10:</strong>
                            <p>Fly to Pokhara and relax.</p>
                        </div>
                    </div>
                </div>
                <CommentSection itineraryId={itineraryId} />
            </div>
            <Footer />
        </>
    );
}

export default ItineraryPage3;
