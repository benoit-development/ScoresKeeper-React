import { db } from './firebase';

// User API

export const doCreateUser = (id, username, email) =>
    db.ref(`users/${id}`).set({
        key: id,
        username,
        email
    });

export const onceGetUsers = () =>
    db.ref('users').once('value');