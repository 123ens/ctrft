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
try {
    const app = firebase.initializeApp(firebaseConfig);
    window.auth = firebase.auth();
    console.log('Firebase initialized successfully');
} catch (error) {
    console.error('Error initializing Firebase:', error);
} 

















