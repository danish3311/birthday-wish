import React, { useState, useEffect } from 'react';
import './App.css';
import party from 'party-js';

function App() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [showParty, setShowParty] = useState(false);

  // Update the time every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  // Trigger party popper every 5 seconds from left and right to center
  useEffect(() => {
    if (showParty) {
      const intervalId = setInterval(() => {
        // Trigger party effect from left and right
        party.confetti(document.body, {
          count: party.variation.range(100, 40),
          angle: party.variation.range(45, 135),
        });
      }, 1000); // Trigger every 5 seconds

      return () => clearInterval(intervalId); // Cleanup interval on unmount
    }
  }, [showParty]);

  const handlePartyButtonClick = () => {
    setShowParty(true);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="neon-text">Happy Birthday 🎂 🥳 
SWEET HEART ❤ 
Mrs.Dabeer</h1>
        <img
          src="unnamed.png"
          alt="Birthday Wish"
          className="birthday-image"
        />
        <div className="message neon-text">
          <p>
            You mean the world to me, and I'm thankful for every moment we spend
            together. I hope this year brings you all the happiness and love that
            you deserve!
          </p>
        </div>

        {/* Digital Clock */}
        <div className="clock">
          <p>{time}</p>
        </div>

        {/* Send Your Love Button */}
        <button className="neon-button" onClick={handlePartyButtonClick}>
          Send Your Love
        </button>
      </header>
    </div>
  );
}

export default App;
