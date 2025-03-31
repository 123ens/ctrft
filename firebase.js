// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBvqmhU5EOiYFQ8N3lSb1SMc7MPCXhOyj0",
    authDomain: "ctrft-livestream.firebaseapp.com",
    projectId: "ctrft-livestream",
    storageBucket: "ctrft-livestream.firebasestorage.app",
    messagingSenderId: "562371146015",
    appId: "1:562371146015:web:39a6727864d94684ff402a"
};

let auth;
try {
    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    console.log('Firebase initialized successfully');
} catch (error) {
    console.error('Error initializing Firebase:', error);
}

export { auth };


















