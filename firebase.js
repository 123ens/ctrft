import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvqmhU5EOiYFQ8N3lSb1SMc7MPCXhOyj0",
  authDomain: "ctrft-livestream.firebaseapp.com",
  projectId: "ctrft-livestream",
  storageBucket: "ctrft-livestream.firebasestorage.app",
  messagingSenderId: "562371146015",
  appId: "1:562371146015:web:39a6727864d94684ff402a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

