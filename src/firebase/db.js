import { db } from './firebase';

// User API

export const doCreateUser = (user) => {
    console.log(user);
    return db.ref(`users/${user.uid}`).set({
        key: user.uid,
        username: user.displayName,
        email: user.email,
        type: user.providerData[0].providerId
    })
};

export const onceGetUsers = () =>
    db.ref('users').once('value');