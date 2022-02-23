/* eslint-disable no-underscore-dangle */
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/global.scss';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Root from './components/containers/AppContainer';
import getConfig from './firebase';
import appReducers from './reducers';
import registerServiceWorker from './registerServiceWorker';

const firebaseApp = initializeApp(getConfig());
const auth = getAuth(firebaseApp);

const store = createStore(
  appReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

ReactDOM.render(
  <Provider store={store}>
    <Root auth={auth} />
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
