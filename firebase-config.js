import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

onst firebaseConfig = {
  // Replace these with your Firebase config values
  apiKey: "AIzaSyBvqmhU5EOiYFQ8N3lSb1SMc7MPCXhOyj0",
  authDomain: "ctrft-livestream.firebaseapp.com",
  projectId: "ctrft-livestream",
  storageBucket: "ctrft-livestream.firebasestorage.app",
  messagingSenderId: "562371146015",
  appId: "1:562371146015:web:39a6727864d94684ff402a"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth(); 

