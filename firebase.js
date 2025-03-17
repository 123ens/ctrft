import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

import { auth } from './firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

document.getElementById("signup-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("User signed up:", userCredential.user);
      localStorage.setItem("authToken", "true"); // Simple token for demo
      window.location.href = "/livestream"; // Redirect to live stream page
    })
    .catch((error) => {
      console.error("Error signing up:", error.message);
    });
});

document.getElementById("signin-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("User signed in:", userCredential.user);
      localStorage.setItem("authToken", "true"); // Simple token for demo
      window.location.href = "/livestream"; // Redirect to live stream page
    })
    .catch((error) => {
      console.error("Error signing in:", error.message);
    });
});

if (!localStorage.getItem("authToken")) {
    alert("Please log in to access the live stream.");
    window.location.href = "/login";
  }
