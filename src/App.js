import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';

import firebase from './firebase'; // Correct path to your firebase.js
import SignIn from './components/SignIn'; // Correct path to your SignIn.js
import SendMessage from './components/SendMessage'; // Correct path to your SendMessage.js
import SignOut from './components/SignOut'; // Correct path to your SendMessage.js
import DraggableTest from './components/draggableTest';




const db = firebase.firestore();
const auth = firebase.auth();

// Assuming user is the object returned by the Firebase auth process
const user = firebase.auth().currentUser;

if (user) {
  // Reference to users collection in Firestore
  const userRef = firebase.firestore().collection('users').doc(user.uid);

  userRef.get().then((doc) => {
    if (doc.exists) {
      // User exists, load preferences
      const userData = doc.data();
      console.log("User data:", userData);
      // Update UI or application state with user preferences
    } else {
      // No user, create new user document
      userRef.set({
        email: user.email,
        preferences: {} // Populate with default or empty preferences
      });
      // Initialize application state with default or empty preferences
    }
  }).catch((error) => {
    console.log("Error getting user document:", error);
  });
}

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  return (
    <div className='pageWrapper'>
        {!user ? <SignIn /> : <><DraggableTest /><SignOut /></>}
    </div>
  );
};

export default App;
