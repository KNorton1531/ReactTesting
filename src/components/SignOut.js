import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import firebase from '../firebase'; // Adjust the path as necessary
import { FaSignOutAlt } from "react-icons/fa";
import '../css/signIn.css'; // Assuming you have some styles defined here

const SignOut = () => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const signOut = () => {
    firebase.auth().signOut();
  };

  const toggleConfirmDialog = () => {
    setShowConfirmDialog(!showConfirmDialog);
  };

  const ConfirmDialog = () => (
    ReactDOM.createPortal(
      <div className="confirmationDialog">
        <div className="dialogContent">
        <h3>Sign Out</h3>
          <p>Are you sure you want to sign out?</p>
          <div className='signoutButtons'>
            <button onClick={signOut}>Yes</button>
            <button onClick={toggleConfirmDialog}>No</button>
          </div>
        </div>
      </div>,
      document.body
    )
  );

  return (
    <>
      <button className='signoutButton' onClick={toggleConfirmDialog}><FaSignOutAlt /></button>
      {showConfirmDialog && <ConfirmDialog />}
    </>
  );
};

export default SignOut;
