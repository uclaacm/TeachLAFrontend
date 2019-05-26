import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./styles/index.css";
import Root from "./components/containers/AppContainer.js";
import registerServiceWorker from "./registerServiceWorker";
import { createStore } from "redux";
import appReducers from "./reducers";
import config from "./firebase-config.js";
import { Provider } from "react-redux";
import firebase from "firebase";

firebase.initializeApp(config);

const store = createStore(appReducers);

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById("root"),
);

registerServiceWorker();
