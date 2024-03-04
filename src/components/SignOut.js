// In SignOut.js
import React from 'react';
import firebase from '../firebase'; // Adjust the path as necessary

const SignOut = () => {
  const signOut = () => {
    firebase.auth().signOut();
  };

  return (
    <button onClick={signOut}>Sign Out</button>
  );
};

export default SignOut;
