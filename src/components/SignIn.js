import React from 'react';
import firebase from 'firebase/app';
import logo from '../assets/googleIcon.jpg'; // Importing logo from local file
import '../css/signIn.css';

const SignIn = () => {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
      }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...

      });
  };

  return (
    <div className='signInWrapper'>
        <div className='signInContainer'>
            <img className='googleIcon' src={logo} alt="Logo" /> {/* Corrected img tag */}
            <button className='signInButton' onClick={signInWithGoogle}>Sign In with Google</button>
        </div>
    </div>
  );
};

export default SignIn;
