// import {auth.FacebookAuthProvider} from "firebase";
import * as firebase from "firebase/app";
import "firebase/auth";

// export const provider = new auth.FacebookAuthProvider();
export const provider = new firebase.auth.FacebookAuthProvider();

let config = {
  apiKey: "AIzaSyD6a3Br7b52N2c6MjZTu1UU0ssf3ZwbfoA",
  authDomain: "tla-editor-backend-staging.firebaseapp.com",
  databaseURL: "https://tla-editor-backend-staging.firebaseio.com",
  projectId: "tla-editor-backend-staging",
  storageBucket: "tla-editor-backend-staging.appspot.com",
  messagingSenderId: "665461655548",
  appId: "1:665461655548:web:146e120e8b12f433429479",
};

if (process && process.env) {
  if (process.env.REACT_APP_FS_PROJ === "staging") {
    config = {
      apiKey: "AIzaSyD6a3Br7b52N2c6MjZTu1UU0ssf3ZwbfoA",
      authDomain: "tla-editor-backend-staging.firebaseapp.com",
      databaseURL: "https://tla-editor-backend-staging.firebaseio.com",
      projectId: "tla-editor-backend-staging",
      storageBucket: "tla-editor-backend-staging.appspot.com",
      messagingSenderId: "665461655548",
      appId: "1:665461655548:web:146e120e8b12f433429479",
    };
  }
  if (process.env.REACT_APP_FS_PROJ === "prod") {
    config = {
      apiKey: "AIzaSyBfGWPbFcqH2HLc40B1yCY12B9F0_PO8SM",
      authDomain: "teachlacodeplatform-production.firebaseapp.com",
      databaseURL: "https://teachlacodeplatform-production.firebaseio.com",
      projectId: "teachlacodeplatform-production",
      storageBucket: "teachlacodeplatform-production.appspot.com",
      messagingSenderId: "165628144896",
    };
  }
}

export default config;
