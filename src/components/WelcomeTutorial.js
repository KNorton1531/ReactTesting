import React, { useState } from 'react';
import '../css/WelcomeTutorial.css';
import firebase from '../firebase';
import { FiSettings } from 'react-icons/fi'; // Settings icon from react-icons

const Tutorial = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [showNameInput, setShowNameInput] = useState(true); // Initial state to show name input
  const [firstName, setFirstName] = useState(''); // State for firstName
  const [error, setError] = useState(''); // State to hold any form errors

  const handleDismissTutorial = () => {
    localStorage.setItem('visibility-welcomeContainer', true); // Set localStorage item
    const welcomeContainer = document.querySelector('.welcomeContainer');
    if (welcomeContainer) {
      welcomeContainer.style.display = 'block'; // Set display to block
    }
    setIsVisible(false); // Hide the tutorial container
  };

  const handleChange = (event) => {
    setFirstName(event.target.value);
    setError(''); // Clear error on user typing
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!firstName.trim()) {
      setError('Name cannot be empty.'); // Set error if input is empty
      return;
    }
    const user = firebase.auth().currentUser;
    if (user) {
      const userRef = firebase.firestore().collection('users').doc(user.uid);
      userRef.set({
        firstName: firstName
      }, { merge: true })
      .then(() => {
        console.log("Document successfully updated!");
        setShowNameInput(false); // Switch to tutorial text upon successful submission
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
        setError('Failed to update name. Please try again.');
      });
    } else {
      setError('No user is currently logged in.');
    }
  };

  return (
    <>
      {isVisible && (
        <div className="tutorialContainer">
            <h2>Welcome :)</h2>
            {showNameInput ? (
                <>
                  <p className='namePromptLabel'>Let's start with your name</p>
                    <form onSubmit={handleSubmit} autoComplete="off">
                        <input type='text' name='firstName' value={firstName} onChange={handleChange}/>
                        {error && <p className="error">{error}</p>}
                        <button className='finishButton' type="submit">Save</button>
                    </form>
                </>
            ) : (
              <>
                <p className="intro">Let's get you started...</p>
                <p className="appBarDescription">You'll find a white tab down there at the bottom</p>
                <p className="appToggleInstructions">That is your app bar. Use it to toggle apps on and off</p>
                <p className="appDragNotice">Some apps are draggable, some are not.</p>
                <p className="settingsInfo">You can find settings by clicking the <FiSettings /> button on most apps</p>
                <button onClick={handleDismissTutorial} className="continueButton">I'm ready to relax</button>
                <p className="firstVisitNotice">(This welcome will only appear on your first visit)</p>
              </>
            )}
        </div>
      )}
    </>
  );
};

export default Tutorial;
