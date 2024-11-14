import React, { useState, useEffect } from 'react';
import './App.css';
import party from 'party-js';

function App() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [showLayout, setShowLayout] = useState(false); // State to control layout visibility
  const [showParty, setShowParty] = useState(false);
  const [imageIndex, setImageIndex] = useState(0); // State for image index

  // List of images with names '1.png', '2.png', '3.png', '4.png', '5.png'
  const images = ['0.png', '1.jpeg', '2.jpeg', '3.jpeg', '4.jpeg'];

  // Update the time every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(intervalId); // Clean up the interval
  }, []);

  // Start the party popper effect as soon as the layout is shown
  useEffect(() => {
    if (showLayout) {
      setShowParty(true); // Start the party effect when layout is shown
    } else {
      setShowParty(false); // Stop the party effect if layout is hidden
    }
  }, [showLayout]);

  // Trigger party popper every 5 seconds from left and right to center
  useEffect(() => {
    let intervalId;
    if (showParty) {
      intervalId = setInterval(() => {
        party.confetti(document.body, {
          count: party.variation.range(60, 30),
          angle: party.variation.range(45, 135),
        });
      }, 1000); // Trigger every second (or you can adjust this interval)
    } else {
      clearInterval(intervalId); // Stop party popper when not needed
    }

    return () => clearInterval(intervalId); // Clean up on component unmount or when showParty changes
  }, [showParty]);

  // Show the birthday layout when Surprise button is clicked
  const handleSurpriseButtonClick = () => {
    setShowLayout(true); // Show the layout when clicked
  };

  // Switch the image after 2 seconds and then loop through the other 4 images
  useEffect(() => {
    let timer;
    if (showLayout) {
      // Show the first image for 2 seconds
      timer = setTimeout(() => {
        setImageIndex(1); // Change to the second image after 2 seconds

        // Start looping through the other 4 images
        const loopInterval = setInterval(() => {
          setImageIndex((prevIndex) => {
            // Loop only through images 1 to 4
            if (prevIndex === 4) return 1; // Go back to image 1 if it's the last one
            return prevIndex + 1; // Otherwise move to the next image
          });
        }, 2000); // Change image every 2 seconds

        return () => clearInterval(loopInterval); // Cleanup the interval
      }, 2000); // Delay the first image switch for 2 seconds
    }

    return () => clearTimeout(timer); // Cleanup the timeout
  }, [showLayout]);

  return (
    <div className="app">
      <header className="app-header">
        {!showLayout ? (
          <>
            {/* Digital Clock above the Surprise button */}
            <div className="clock-timer">
              <p className="clock satisfy-regular">{time}</p>
            </div>

            <button className="neon-button" onClick={handleSurpriseButtonClick}>
              Surprise
            </button>
          </>
        ) : (
          <>
            <h1 className="neon-text satisfy-regular">❤ Happy Birthday! 🎂 🥳 SWEET HEART Mr.Dabeer ❤</h1>
            {/* Show image based on the imageIndex state */}
            <img
              src={images[imageIndex]} // Dynamically update image based on imageIndex state
              alt="Birthday Wish"
              className="birthday-image"
            />
            <div className="message neon-text">
              <p className='satisfy-regular'>
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
