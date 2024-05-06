import React, { useState } from 'react';
import '../css/WelcomeTutorial.css';

const Tutorial = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismissTutorial = () => {
    localStorage.setItem('visitedBefore', true);
    setIsVisible(false); // Hide the tutorial container
  };

  return (
    <>
      {isVisible && (
        <div className="tutorialContainer">
          <h2>Welcome to Our App!</h2>
          <p>This is a basic tutorial to guide you through the app.</p>
          <p>Step 1: Do something</p>
          <p>Step 2: Do something else</p>
          <p>Step 3: Finally, do this</p>
          <button className='finishButton' onClick={handleDismissTutorial}>Got it!</button>
        </div>
      )}
    </>
  );
};

export default Tutorial;
