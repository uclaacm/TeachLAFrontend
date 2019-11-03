import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./styles/global.scss";
import Root from "./components/containers/AppContainer.js";
import registerServiceWorker from "./registerServiceWorker";
import { createStore } from "redux";
import appReducers from "./reducers";
import config from "./firebase";
import { Provider } from "react-redux";
import firebase from "firebase";

firebase.initializeApp(config);

const store = createStore(
  appReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById("root"),
);

registerServiceWorker();
