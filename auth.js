// Form switching functionality
document.getElementById('show-signup').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('signin-form-container').classList.remove('active');
    document.getElementById('signup-form-container').classList.add('active');
});

document.getElementById('show-signin').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('signup-form-container').classList.remove('active');
    document.getElementById('signin-form-container').classList.add('active');
});

// Authentication state observer
auth.onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        document.getElementById('auth-container').style.display = 'none';
        document.getElementById('livestream-section').style.display = 'block';
        document.getElementById('user-info').style.display = 'block';
        document.getElementById('user-email').textContent = user.email;
    } else {
        // User is signed out
        document.getElementById('auth-container').style.display = 'block';
        document.getElementById('livestream-section').style.display = 'none';
        document.getElementById('user-info').style.display = 'none';
    }
});

// Sign Up
document.getElementById('signup-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed up successfully
            console.log('User signed up:', userCredential.user);
        })
        .catch((error) => {
            alert(error.message);
        });
});

// Sign In
document.getElementById('signin-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in successfully
            console.log('User signed in:', userCredential.user);
        })
        .catch((error) => {
            alert(error.message);
        });
});

// Google Sign In
const googleProvider = new firebase.auth.GoogleAuthProvider();
document.getElementById('google-signin').addEventListener('click', () => {
    auth.signInWithPopup(googleProvider)
        .then((result) => {
            // Google sign in successful
            console.log('Google sign in successful:', result.user);
        })
        .catch((error) => {
            alert(error.message);
        });
});

// Google Sign Up (same as sign in for Google)
document.getElementById('google-signup').addEventListener('click', () => {
    auth.signInWithPopup(googleProvider)
        .then((result) => {
            // Google sign up successful
            console.log('Google sign up successful:', result.user);
        })
        .catch((error) => {
            alert(error.message);
        });
});

// Sign Out
document.getElementById('signout-btn').addEventListener('click', () => {
    auth.signOut()
        .then(() => {
            // Sign-out successful
            console.log('User signed out');
        })
        .catch((error) => {
            console.error('Error signing out:', error);
        });
}); 
