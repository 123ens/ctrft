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

// Debug: Log DOM elements
console.log('DOM Elements initialized:', {
    signinForm: !!signinForm,
    signupForm: !!signupForm,
    signinFormContainer: !!signinFormContainer,
    signupFormContainer: !!signupFormContainer,
    showSignupLink: !!showSignupLink,
    showSigninLink: !!showSigninLink,
    signoutBtn: !!signoutBtn,
    userEmailSpan: !!userEmailSpan,
    authContainer: !!authContainer,
    livestreamSection: !!livestreamSection,
    googleSigninBtn: !!googleSigninBtn,
    googleSignupBtn: !!googleSignupBtn
});

// Form switching
showSignupLink.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('Switching to sign-up form');
    if (signinFormContainer && signupFormContainer) {
        signinFormContainer.classList.remove('active');
        signupFormContainer.classList.add('active');
        console.log('Form classes after switch:', {
            signinForm: signinFormContainer.classList.toString(),
            signupForm: signupFormContainer.classList.toString()
        });
    } else {
        console.error('Form containers not found');
    }
});

showSigninLink.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('Switching to sign-in form');
    if (signinFormContainer && signupFormContainer) {
        signupFormContainer.classList.remove('active');
        signinFormContainer.classList.add('active');
        console.log('Form classes after switch:', {
            signinForm: signinFormContainer.classList.toString(),
            signupForm: signupFormContainer.classList.toString()
        });
    } else {
        console.error('Form containers not found');
    }
});

// Authentication state observer
firebase.auth().onAuthStateChanged((user) => {
    console.log('Auth state changed:', user ? 'User signed in' : 'User signed out');
    if (user) {
        console.log('User email:', user.email);
        userEmailSpan.textContent = user.email;
        
        // Hide auth container and show livestream
        authContainer.style.display = 'none';
        livestreamSection.style.display = 'block';
        livestreamSection.classList.add('visible');
        
        console.log('Auth container display:', authContainer.style.display);
        console.log('Livestream section display:', livestreamSection.style.display);
        console.log('Livestream section classes:', livestreamSection.classList.toString());
    } else {
        console.log('User signed out, hiding livestream');
        userEmailSpan.textContent = '';
        
        // Show auth container and hide livestream
        authContainer.style.display = 'block';
        livestreamSection.style.display = 'none';
        livestreamSection.classList.remove('visible');
        
        console.log('Auth container display:', authContainer.style.display);
        console.log('Livestream section display:', livestreamSection.style.display);
        console.log('Livestream section classes:', livestreamSection.classList.toString());
    }
});

// Helper function to show error messages
function showError(message) {
    console.log('Showing error message:', message);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#f44336';
    errorDiv.style.marginTop = '10px';
    errorDiv.style.textAlign = 'center';
    
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
    console.log('Setting loading state:', isLoading);
    const buttons = document.querySelectorAll('.form-container.active button');
    buttons.forEach(button => {
        button.disabled = isLoading;
        if (isLoading) {
            button.setAttribute('data-original-text', button.textContent);
            button.textContent = 'Loading...';
        } else {
            button.textContent = button.getAttribute('data-original-text') || button.textContent;
        }
    });
}

// Sign Up
if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log('Sign up form submitted');
        setLoading(true);
        
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;

        console.log('Attempting to create user with email:', email);
        console.log('Password length:', password.length);

        if (!email || !password) {
            console.error('Email or password is empty');
            showError('Please fill in all fields');
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            console.error('Password too short');
            showError('Password must be at least 6 characters long');
            setLoading(false);
            return;
        }

        try {
            console.log('Calling Firebase createUserWithEmailAndPassword');
            const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
            console.log('User signed up successfully:', userCredential.user);
            // Clear the form
            signupForm.reset();
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
} else {
    console.error('Sign up form not found');
}

// Sign In
if (signinForm) {
    signinForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        setLoading(true);
        
        const email = document.getElementById('signin-email').value;
        const password = document.getElementById('signin-password').value;

        try {
            const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
            console.log('User signed in:', userCredential.user);
            // Clear the form
            signinForm.reset();
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
} else {
    console.error('Sign in form not found');
}

// Google Sign In
if (googleSigninBtn) {
    googleSigninBtn.addEventListener('click', async () => {
        setLoading(true);
        try {
            const provider = new firebase.auth.GoogleAuthProvider();
            const result = await firebase.auth().signInWithPopup(provider);
            console.log('Google sign in successful:', result.user);
        } catch (error) {
            console.error('Google sign in error:', error);
            showError('Failed to sign in with Google. Please try again.');
        } finally {
            setLoading(false);
        }
    });
} else {
    console.error('Google sign in button not found');
}

// Google Sign Up
if (googleSignupBtn) {
    googleSignupBtn.addEventListener('click', async () => {
        setLoading(true);
        try {
            const provider = new firebase.auth.GoogleAuthProvider();
            const result = await firebase.auth().signInWithPopup(provider);
            console.log('Google sign up successful:', result.user);
        } catch (error) {
            console.error('Google sign up error:', error);
            showError('Failed to sign up with Google. Please try again.');
        } finally {
            setLoading(false);
        }
    });
} else {
    console.error('Google sign up button not found');
}

// Sign Out
if (signoutBtn) {
    signoutBtn.addEventListener('click', async () => {
        try {
            await firebase.auth().signOut();
            console.log('User signed out');
        } catch (error) {
            console.error('Error signing out:', error);
            showError('Failed to sign out. Please try again.');
        }
    });
} else {
    console.error('Sign out button not found');
} 
