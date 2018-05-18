import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import Root from './containers/root';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux'
import app from './reducers'
import config from './firebase'
import { Provider } from 'react-redux'
import firebase from 'firebase'

const store = createStore(app)
firebase.initializeApp(config);

ReactDOM.render(
  <Provider store={store}>
    <Root/>
  </Provider>,
  document.getElementById('root'));

registerServiceWorker();
