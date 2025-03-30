import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    GoogleAuthProvider, 
    signOut,
    onAuthStateChanged 
} from "firebase/auth";
import { auth } from "./firebase.js";

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
onAuthStateChanged(auth, (user) => {
    console.log('Auth state changed:', user ? 'User signed in' : 'User signed out');
    if (user) {
        // User is signed in
        console.log('User email:', user.email);
        const authContainer = document.getElementById('auth-container');
        const livestreamSection = document.getElementById('livestream-section');
        const userInfo = document.getElementById('user-info');
        
        console.log('Before state change:');
        console.log('Auth container display:', authContainer.style.display);
        console.log('Livestream section display:', livestreamSection.style.display);
        
        authContainer.style.display = 'none';
        livestreamSection.style.display = 'block';
        userInfo.style.display = 'block';
        document.getElementById('user-email').textContent = user.email;
        
        console.log('After state change:');
        console.log('Auth container display:', authContainer.style.display);
        console.log('Livestream section display:', livestreamSection.style.display);
    } else {
        // User is signed out
        console.log('User signed out, hiding livestream');
        document.getElementById('auth-container').style.display = 'block';
        document.getElementById('livestream-section').style.display = 'none';
        document.getElementById('user-info').style.display = 'none';
    }
});

// Helper function to show error messages
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#f44336';
    errorDiv.style.marginTop = '10px';
    errorDiv.style.textAlign = 'center';
    
    // Remove any existing error messages
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add the new error message
    const form = document.querySelector('.form-container.active form');
    form.appendChild(errorDiv);
    
    // Remove error after 5 seconds
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

// Sign Up
document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('Sign up form submitted');
    setLoading(true);
    
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    console.log('Attempting to create user with email:', email);

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
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
document.getElementById('signin-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const email = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
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
const googleProvider = new GoogleAuthProvider();
document.getElementById('google-signin').addEventListener('click', async () => {
    setLoading(true);
    try {
        const result = await signInWithPopup(auth, googleProvider);
        console.log('Google sign in successful:', result.user);
        // Success! The auth state observer will handle the UI update
    } catch (error) {
        console.error('Google sign in error:', error);
        showError('Failed to sign in with Google. Please try again.');
    } finally {
        setLoading(false);
    }
});

// Google Sign Up (same as sign in for Google)
document.getElementById('google-signup').addEventListener('click', async () => {
    setLoading(true);
    try {
        const result = await signInWithPopup(auth, googleProvider);
        console.log('Google sign up successful:', result.user);
        // Success! The auth state observer will handle the UI update
    } catch (error) {
        console.error('Google sign up error:', error);
        showError('Failed to sign up with Google. Please try again.');
    } finally {
        setLoading(false);
    }
});

// Sign Out
document.getElementById('signout-btn').addEventListener('click', async () => {
    try {
        await signOut(auth);
        console.log('User signed out');
        // Success! The auth state observer will handle the UI update
    } catch (error) {
        console.error('Error signing out:', error);
        showError('Failed to sign out. Please try again.');
    }
}); 
