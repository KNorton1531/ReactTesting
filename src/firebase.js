import firebase from 'firebase/app';
import 'firebase/firestore';  // If you're using Firestore
import 'firebase/auth';       // If you're using Firebase Authentication

const firebaseConfig = {
  apiKey: "AIzaSyCWfNiOxPl1yX4wsKi0KijVUk5FxwNdyU8",
  authDomain: "testproject-8027d.firebaseapp.com",
  projectId: "testproject-8027d",
  storageBucket: "testproject-8027d.appspot.com",
  messagingSenderId: "641592531880",
  appId: "1:641592531880:web:0103ec5ca5d050c7b7db9d",
  measurementId: "G-8D4Z2Y10K3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
