// In SignOut.js
import React from 'react';
import firebase from '../firebase'; // Adjust the path as necessary
import { FaSignOutAlt } from "react-icons/fa";

const SignOut = () => {
  const signOut = () => {
    firebase.auth().signOut();
  };

  return (
    <button className='signoutButton' onClick={signOut}><FaSignOutAlt /></button>
  );
};

export default SignOut;
