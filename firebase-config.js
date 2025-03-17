import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCAfwAjagXYpFvkTvBw3EbgNIIrrOaP0Xc",
  authDomain: "ctrft-livestream-3e3e7.firebaseapp.com",
  projectId: "ctrft-livestream-3e3e7",
  storageBucket: "ctrft-livestream-3e3e7.firebasestorage.app",
  messagingSenderId: "583221601139",
  appId: "1:583221601139:web:445d9744d95ca4f3aedb06"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { auth };
