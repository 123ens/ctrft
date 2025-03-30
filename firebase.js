// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBvqmhU5EOiYFQ8N3lSb1SMc7MPCXhOyj0",
    authDomain: "ctrft-livestream.firebaseapp.com",
    projectId: "ctrft-livestream",
    storageBucket: "ctrft-livestream.appspot.com",
    messagingSenderId: "562371146015",
    appId: "1:562371146015:web:39a6727864d94684ff402a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };





