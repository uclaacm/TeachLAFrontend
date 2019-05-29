import firebase from "firebase";

export const provider = new firebase.auth.FacebookAuthProvider();

let config = {
  apiKey: "AIzaSyDVyHkYHjs7LeHyOWMSPRMTRgr8BrdkXis",
  authDomain: "aseemconnorpracticedb.firebaseapp.com",
  databaseURL: "https://aseemconnorpracticedb.firebaseio.com",
  projectId: "aseemconnorpracticedb",
  storageBucket: "aseemconnorpracticedb.appspot.com",
  messagingSenderId: "849734484070",
  appId: "1:849734484070:web:8d3eff0ee977915b",
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
