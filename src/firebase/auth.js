import { auth, googleAuthProvider, facebookAuthProvider, twitterAuthProvider } from './firebase';

// Sign up
export const doCreateUserWithEmailAndPassword = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
}

// Sign in
export const doSignInWithEmailAndPassword = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
};

// Sign in using Google account
export const doSignInWithGoogleAccount = () => {
    return auth.signInWithPopup(googleAuthProvider);
};

// Sign in using Facebook account
export const doSignInWithFacebookAccount = () => {
    return auth.signInWithPopup(facebookAuthProvider);
};

// Sign in using Twitter account
export const doSignInWithTwitterAccount = () => {
    return auth.signInWithPopup(twitterAuthProvider);
};

// Sign out
export const doSignOut = () => {
    return auth.signOut();
}

// Password reset
export const doPasswordReset = (email) => {
    return auth.sendPasswordResetEmail(email);
}

// Password update
export const doPasswordUpdate = (password) => {
    return auth.currentUser.updatePassword(password);
}