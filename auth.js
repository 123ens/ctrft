// auth.js
import { auth } from './firebase-config.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

function signUp(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            showLivestream();
        })
        .catch((error) => {
            console.error("Error signing up:", error);
        });
}

function signIn(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            showLivestream();
        })
        .catch((error) => {
            console.error("Error signing in:", error);
        });
}

function showLivestream() {
    document.getElementById("livestream-section").style.display = "block";
    document.querySelector(".signup-container").style.display = "none";
}

window.signUp = signUp;
window.signIn = signIn;

// auth.js (continued)
document.addEventListener("DOMContentLoaded", function() {
    if (!auth.currentUser) {
        // Hide livestream and show sign-up form if not logged in
        document.getElementById("livestream-section").style.display = "none";
        document.querySelector(".signup-container").style.display = "block";
    } else {
        showLivestream();
    }
});

