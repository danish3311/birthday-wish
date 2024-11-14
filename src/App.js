import React, { useState, useEffect } from 'react';
import './App.css';
import party from 'party-js';

function App() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [showLayout, setShowLayout] = useState(false); // State to control layout visibility
  const [showParty, setShowParty] = useState(false);

  // Update the time every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Start the party popper effect as soon as the layout is shown
  useEffect(() => {
    if (showLayout) {
      setShowParty(true); // Start the party effect when layout is shown
    }
  }, [showLayout]);

  // Trigger party popper every 5 seconds from left and right to center
  useEffect(() => {
    if (showParty) {
      const intervalId = setInterval(() => {
        party.confetti(document.body, {
          count: party.variation.range(60, 30),
          angle: party.variation.range(45, 135),
        });
      }, 1000); // Trigger every 5 seconds

      return () => clearInterval(intervalId);
    }
  }, [showParty]);

  // Show the birthday layout when Surprise button is clicked
  const handleSurpriseButtonClick = () => {
    setShowLayout(true); // Show the layout when clicked
  };

  return (
    <div className="app">
      <header className="app-header">
        {!showLayout ? (
          <>
            {/* Digital Clock above the Surprise button */}
            <div className="clock-timer">
              <p className="clock">{time}</p>
            </div>

            <button className="neon-button" onClick={handleSurpriseButtonClick}>
              Surprise
            </button>
          </>
        ) : (
          <>
            <h1 className="neon-text">Happy Birthday! 🎂 🥳 SWEET HEART ❤ Mr.Dabeer</h1>
            {/* Apply heart shape and square toggle effect */}
            <img
              src="unnamed.png"
              alt="Birthday Wish"
              className="birthday-image"
            />
            <div className="message neon-text">
              <p>
                You mean the world to me, and I'm thankful for every moment we
                spend together. I hope this year brings you all the happiness and
                love that you deserve!
              </p>
            </div>

            {/* Digital Clock */}
            <div className="clock">
              <p>{time}</p>
            </div>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
