// DOM Elements
const signinForm = document.getElementById('signin-form');
const signupForm = document.getElementById('signup-form');
const signinFormContainer = document.getElementById('signin-form-container');
const signupFormContainer = document.getElementById('signup-form-container');
const showSignupLink = document.getElementById('show-signup');
const showSigninLink = document.getElementById('show-signin');
const signoutBtn = document.getElementById('signout-btn');
const userEmailSpan = document.getElementById('user-email');
const authContainer = document.getElementById('auth-container');
const livestreamSection = document.getElementById('livestream-section');
const googleSigninBtn = document.getElementById('google-signin');
const googleSignupBtn = document.getElementById('google-signup');

// Form switching
showSignupLink.addEventListener('click', (e) => {
    e.preventDefault();
    signinFormContainer.classList.remove('active');
    signupFormContainer.classList.add('active');
});

showSigninLink.addEventListener('click', (e) => {
    e.preventDefault();
    signupFormContainer.classList.remove('active');
    signinFormContainer.classList.add('active');
});

// Authentication state observer
firebase.auth().onAuthStateChanged((user) => {
    console.log('Auth state changed:', user ? 'User signed in' : 'User signed out');
    if (user) {
        // User is signed in
        console.log('User email:', user.email);
        userEmailSpan.textContent = user.email;
        authContainer.style.display = 'none';
        livestreamSection.style.display = 'block';
        console.log('Auth container display:', authContainer.style.display);
        console.log('Livestream section display:', livestreamSection.style.display);
    } else {
        // User is signed out
        console.log('User signed out, hiding livestream');
        userEmailSpan.textContent = '';
        authContainer.style.display = 'block';
        livestreamSection.style.display = 'none';
        console.log('Auth container display:', authContainer.style.display);
        console.log('Livestream section display:', livestreamSection.style.display);
    }
});

// Helper function to show error messages
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    const activeForm = signinFormContainer.classList.contains('active') ? 
        signinFormContainer : signupFormContainer;
    
    const existingError = activeForm.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    activeForm.insertBefore(errorDiv, activeForm.firstChild);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Helper function to set loading state
function setLoading(isLoading) {
    const buttons = document.querySelectorAll('.form-container.active button');
    buttons.forEach(button => {
        button.disabled = isLoading;
        button.textContent = isLoading ? 'Loading...' : button.getAttribute('data-original-text') || button.textContent;
    });
}

buttons.forEach(button => {
    if (!button.hasAttribute('data-original-text')) {
        button.setAttribute('data-original-text', button.textContent);
    }
    button.disabled = isLoading;
    button.textContent = isLoading ? 'Loading...' : button.getAttribute('data-original-text');
});


// Sign Up
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('Sign up form submitted');
    setLoading(true);
    
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    console.log('Attempting to create user with email:', email);

    try {
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
        console.log('User signed up successfully:', userCredential.user);
        // Success! The auth state observer will handle the UI update
    } catch (error) {
        console.error('Sign up error:', error);
        let errorMessage = 'An error occurred during sign up.';
        
        switch (error.code) {
            case 'auth/email-already-in-use':
                errorMessage = 'This email is already registered. Please sign in instead.';
                break;
            case 'auth/invalid-email':
                errorMessage = 'Please enter a valid email address.';
                break;
            case 'auth/operation-not-allowed':
                errorMessage = 'Email/password accounts are not enabled. Please contact support.';
                break;
            case 'auth/weak-password':
                errorMessage = 'Please choose a stronger password (at least 6 characters).';
                break;
            default:
                errorMessage = error.message;
        }
        
        showError(errorMessage);
    } finally {
        setLoading(false);
    }
});

// Sign In
signinForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const email = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;

    try {
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
        console.log('User signed in:', userCredential.user);
        // Success! The auth state observer will handle the UI update
    } catch (error) {
        console.error('Sign in error:', error);
        let errorMessage = 'An error occurred during sign in.';
        
        switch (error.code) {
            case 'auth/invalid-email':
                errorMessage = 'Please enter a valid email address.';
                break;
            case 'auth/user-disabled':
                errorMessage = 'This account has been disabled. Please contact support.';
                break;
            case 'auth/user-not-found':
                errorMessage = 'No account found with this email. Please sign up instead.';
                break;
            case 'auth/wrong-password':
                errorMessage = 'Incorrect password. Please try again.';
                break;
            default:
                errorMessage = error.message;
        }
        
        showError(errorMessage);
    } finally {
        setLoading(false);
    }
});

// Google Sign In
googleSigninBtn.addEventListener('click', async () => {
    setLoading(true);
    try {
        const provider = new firebase.auth.GoogleAuthProvider();
        const result = await firebase.auth().signInWithPopup(provider);
        console.log('Google sign in successful:', result.user);
        // Success! The auth state observer will handle the UI update
    } catch (error) {
        console.error('Google sign in error:', error);
        showError('Failed to sign in with Google. Please try again.');
    } finally {
        setLoading(false);
    }
});

 // Google Sign In/Up (Combined)
 googleSigninBtn.addEventListener('click', async () => {
     await handleGoogleSignIn();
 });

 googleSignupBtn.addEventListener('click', async () => {
     await handleGoogleSignIn();
 });

 async function handleGoogleSignIn() {
     setLoading(true);
     try {
         const provider = new firebase.auth.GoogleAuthProvider();
         const result = await firebase.auth().signInWithPopup(provider);
         console.log('Google sign in successful:', result.user);
         // Success! The auth state observer will handle the UI update
     } catch (error) {
         console.error('Google sign in error:', error);
         showError('Failed to sign in with Google. Please try again.');
     } finally {
         setLoading(false);
     }
 }
 


document.getElementById('signout-btn').addEventListener('click', async () => {
    try {
        await auth.signOut();
        console.log('User signed out');
        window.location.reload(); // Reload page or redirect to login
    } catch (error) {
        console.error('Error signing out:', error);
        showError('Failed to sign out. Please try again.');
    }
});

function showError(message) {
    const errorDiv = document.getElementById("error-message");
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = "block";

        // Auto-hide after 5 seconds
        setTimeout(() => {
            errorDiv.style.display = "none";
        }, 5000);
    } else {
        alert(message);
    }
}

signoutBtn.addEventListener('click', async () => {
    try {
        await firebase.auth().signOut();
        console.log('User signed out');
        // Success! The auth state observer will handle the UI update
    } catch (error) {
        console.error('Error signing out:', error);
        showError('Failed to sign out. Please try again.');
    }
}); 
