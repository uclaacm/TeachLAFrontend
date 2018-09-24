import firebase from "firebase";

export const provider = new firebase.auth.FacebookAuthProvider();

const config = {
  apiKey: "AIzaSyC8sbXsPzWRHVyPRLQ_dfCUqYsqbRc-S5U",
  authDomain: "teachlacodingplatform.firebaseapp.com",
  databaseURL: "https://teachlacodingplatform.firebaseio.com",
  projectId: "teachlacodingplatform",
  storageBucket: "teachlacodingplatform.appspot.com",
  messagingSenderId: "232833950160",
};

export default config;
