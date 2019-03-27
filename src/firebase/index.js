import firebase from "firebase";

export const provider = new firebase.auth.FacebookAuthProvider();

let config = {
  apiKey: "AIzaSyC8sbXsPzWRHVyPRLQ_dfCUqYsqbRc-S5U",
  authDomain: "teachlacodingplatform.firebaseapp.com",
  databaseURL: "https://teachlacodingplatform.firebaseio.com",
  projectId: "teachlacodingplatform",
  storageBucket: "teachlacodingplatform.appspot.com",
  messagingSenderId: "232833950160",
};

if (process && process.env && process.env.REACT_APP_FS_PROJ === "prod") {
  config = {
    apiKey: "AIzaSyBfGWPbFcqH2HLc40B1yCY12B9F0_PO8SM",
    authDomain: "teachlacodeplatform-production.firebaseapp.com",
    databaseURL: "https://teachlacodeplatform-production.firebaseio.com",
    projectId: "teachlacodeplatform-production",
    storageBucket: "teachlacodeplatform-production.appspot.com",
    messagingSenderId: "165628144896",
  };
}

export default config;
