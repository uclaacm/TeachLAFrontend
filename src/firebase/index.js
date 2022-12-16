import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

const getConfig = () => {
  let config = {
    apiKey: 'AIzaSyD6a3Br7b52N2c6MjZTu1UU0ssf3ZwbfoA',
    authDomain: 'tla-editor-backend-staging.firebaseapp.com',
    databaseURL: 'https://tla-editor-backend-staging.firebaseio.com',
    projectId: 'tla-editor-backend-staging',
    storageBucket: 'tla-editor-backend-staging.appspot.com',
    messagingSenderId: '665461655548',
    appId: '1:665461655548:web:146e120e8b12f433429479',
  };

  if (process && process.env) {
    if (process.env.REACT_APP_FS_PROJ === 'staging') {
      config = {
        apiKey: 'AIzaSyD6a3Br7b52N2c6MjZTu1UU0ssf3ZwbfoA',
        authDomain: 'tla-editor-backend-staging.firebaseapp.com',
        databaseURL: 'https://tla-editor-backend-staging.firebaseio.com',
        projectId: 'tla-editor-backend-staging',
        storageBucket: 'tla-editor-backend-staging.appspot.com',
        messagingSenderId: '665461655548',
        appId: '1:665461655548:web:146e120e8b12f433429479',
      };
    }
    if (process.env.REACT_APP_FS_PROJ === 'prod') {
      config = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG);
    }
  }
  return config;
};

const firebaseApp = initializeApp(getConfig());
const auth = getAuth(firebaseApp);
const onAuthStateChangedFn = (...args) => onAuthStateChanged(auth, ...args);
const signOutFn = (...args) => signOut(auth, ...args);
const createUserWithEmailAndPasswordFn = (...args) => createUserWithEmailAndPassword(auth, ...args);
const signInWithEmailAndPasswordFn = (...args) => signInWithEmailAndPassword(auth, ...args);

const getCreateUserErrorMessage = (err) => {
  let newMsg = err.message;
  switch (err.code) {
  case 'auth/invalid-email':
    newMsg = 'Invalid username. Usernames must only have alphanumeric characters plus !@#$%.';
    break;
  case 'auth/email-already-in-use':
    newMsg = 'Username is taken; please use another one.';
    break;
  case 'auth/user-not-found':
    newMsg = 'No account found for username.';
    break;
  case 'auth/wrong-password':
    newMsg = 'Invalid password provided.';
    break;
  case 'auth/network-request-failed':
    newMsg = 'Network error - check your internet connection.';
    break;
  case 'auth/app-deleted':
  case 'auth/app-not-authorized':
  case 'auth/argument-error':
  case 'auth/invalid-api-key':
  case 'auth/operation-not-allowed':
  case 'auth/requires-recent-login':
  case 'auth/unauthorized-domain':
    newMsg = `App was not properly configured. Please contact administrator. Error: ${err.code}`;
    break;
  case 'auth/invalid-user-token':
  case 'auth/user-disabled':
  case 'auth/user-token-expired':
  case 'auth/web-storage-unsupported':
    newMsg = `Issue with user. Please contact administrator. Error: ${err.code}`;
    break;
  default:
    newMsg = `Failed to sign in: ${err.code}`;
  }

  return newMsg;
};

export {
  onAuthStateChangedFn as onAuthStateChanged,
  signOutFn as signOut,
  createUserWithEmailAndPasswordFn as createUserWithEmailAndPassword,
  signInWithEmailAndPasswordFn as signInWithEmailAndPassword,
  getCreateUserErrorMessage,
};
