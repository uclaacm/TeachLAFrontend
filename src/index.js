import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/index.css';
import Root from './components/containers/AppContainer.js';
import registerServiceWorker from './registerServiceWorker';
import thunkMiddleware from 'redux-thunk'
import { createStore, compose, applyMiddleware } from 'redux'
import appReducers from './reducers'
import config from './firebase'
import { Provider } from 'react-redux'
import firebase from 'firebase'
import 'firebase/firestore'
import { reduxFirestore } from 'redux-firestore'
import { reactReduxFirebase } from 'react-redux-firebase'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

firebase.initializeApp(config);
// Cloud Firestore startup
// settings prevents ominous built-in timestamps warning
const settings = {timestampsInSnapshots: true};
firebase.firestore().settings(settings);

// react-redux-firebase config
const rrfConfig = {
  userProfiles: 'users'
}

const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase)
)(createStore)

const store = createStoreWithFirebase(appReducers, applyMiddleware(
  thunkMiddleware
))

ReactDOM.render(
  <Provider store={store}>
    <Root/>
  </Provider>,
  document.getElementById('root'));

registerServiceWorker();
