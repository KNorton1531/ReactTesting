import React from 'react';
import firebase from '../firebase'; // Correct path to your firebase.js

const SendMessage = () => {
  const sendMessage = () => {
    const user = firebase.auth().currentUser;
    if (user) {
      const message = {
        uid: user.uid,
        content: 'This is a test message',
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      };
      firebase.firestore().collection('messages').add(message)
        .then(() => {
          alert('Message sent!');
        })
        .catch((error) => {
          console.error('Error sending message: ', error);
        });
    }
  };

  return <button onClick={sendMessage}>Send Test Message</button>;
};

export default SendMessage; // Make sure this line is correct
