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
    if (signinFormContainer && signupFormContainer) {
        signinFormContainer.classList.remove('active');
        signupFormContainer.classList.add('active');
    }
});

showSigninLink.addEventListener('click', (e) => {
    e.preventDefault();
    if (signinFormContainer && signupFormContainer) {
        signupFormContainer.classList.remove('active');
        signinFormContainer.classList.add('active');
    }
});

// Authentication state observer
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        userEmailSpan.textContent = user.email;
        // Don't automatically show livestream
        authContainer.style.display = 'block';
        livestreamSection.style.display = 'none';
    } else {
        userEmailSpan.textContent = '';
        authContainer.style.display = 'block';
        livestreamSection.style.display = 'none';
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
        setLoading(true);
        
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;

        if (!email || !password) {
            showError('Please fill in all fields');
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            showError('Password must be at least 6 characters long');
            setLoading(false);
            return;
        }

        try {
            const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
            // Clear the form
            signupForm.reset();
            
            // Show success message and switch to sign-in form
            showError('Registration successful! Please sign in.');
            if (signinFormContainer && signupFormContainer) {
                signupFormContainer.classList.remove('active');
                signinFormContainer.classList.add('active');
            }
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
            // Clear the form
            signinForm.reset();
            
            // Show livestream after successful sign in
            authContainer.style.display = 'none';
            livestreamSection.style.display = 'block';
            livestreamSection.classList.add('visible');
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
}

// Google Sign In
if (googleSigninBtn) {
    googleSigninBtn.addEventListener('click', async () => {
        setLoading(true);
        try {
            const provider = new firebase.auth.GoogleAuthProvider();
            const result = await firebase.auth().signInWithPopup(provider);
            // Show livestream after successful sign in
            authContainer.style.display = 'none';
            livestreamSection.style.display = 'block';
            livestreamSection.classList.add('visible');
        } catch (error) {
            console.error('Google sign in error:', error);
            showError('Failed to sign in with Google. Please try again.');
        } finally {
            setLoading(false);
        }
    });
}

// Google Sign Up
if (googleSignupBtn) {
    googleSignupBtn.addEventListener('click', async () => {
        setLoading(true);
        try {
            const provider = new firebase.auth.GoogleAuthProvider();
            const result = await firebase.auth().signInWithPopup(provider);
            // Show success message and switch to sign-in form
            showError('Registration successful! Please sign in.');
            if (signinFormContainer && signupFormContainer) {
                signupFormContainer.classList.remove('active');
                signinFormContainer.classList.add('active');
            }
        } catch (error) {
            console.error('Google sign up error:', error);
            showError('Failed to sign up with Google. Please try again.');
        } finally {
            setLoading(false);
        }
    });
}

// Sign Out
if (signoutBtn) {
    signoutBtn.addEventListener('click', async () => {
        try {
            await firebase.auth().signOut();
            authContainer.style.display = 'block';
            livestreamSection.style.display = 'none';
            livestreamSection.classList.remove('visible');
        } catch (error) {
            console.error('Error signing out:', error);
            showError('Failed to sign out. Please try again.');
        }
    });
} else {
    console.error('Sign out button not found');
} 
