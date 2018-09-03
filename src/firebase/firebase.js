import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBUWPPMTzExTbYONbgBGpxVDWR9kpgMmbY",
    authDomain: "reactdemo-75b0f.firebaseapp.com",
    databaseURL: "https://reactdemo-75b0f.firebaseio.com",
    projectId: "reactdemo-75b0f",
    storageBucket: "reactdemo-75b0f.appspot.com",
    messagingSenderId: "988549865643"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const db = firebase.database();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const twitterAuthProvider = new firebase.auth.TwitterAuthProvider();
const auth = firebase.auth();

export {
    db,
    auth,
    googleAuthProvider,
    facebookAuthProvider,
    twitterAuthProvider
};