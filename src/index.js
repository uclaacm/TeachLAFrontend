import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./styles/index.css";
import Root from "./components/containers/AppContainer.js";
import registerServiceWorker from "./registerServiceWorker";
import thunkMiddleware from "redux-thunk";
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import appReducers from "./reducers";
import config from "./firebase";
import { Provider } from "react-redux";
import firebase from "firebase";
import "firebase/firestore";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
import { firebaseReducer, reactReduxFirebase } from "react-redux-firebase";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

firebase.initializeApp(config);
// Cloud Firestore startup
// settings prevents ominous built-in timestamps warning
const settings = { timestampsInSnapshots: true };
firebase.firestore().settings(settings);

// react-redux-firebase config
const rrfConfig = {
  userProfiles: "users",
};

const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase),
)(createStore);

// reducers segmented into app related reducers, and ready provided reducers for
// firestore and react
const rootReducer = combineReducers({
  app: appReducers,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

const initialState = {};
const store = createStoreWithFirebase(rootReducer, applyMiddleware(thunkMiddleware));

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById("root"),
);

registerServiceWorker();
