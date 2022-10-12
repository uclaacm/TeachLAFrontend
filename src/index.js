/* eslint-disable no-underscore-dangle */
import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/global.scss';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Root from './components/containers/AppContainer';
import appReducers from './reducers';
import registerServiceWorker from './registerServiceWorker';

const jon = createStore(
  appReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

ReactDOM.render(
  <Provider store={jon}>
    <Root />
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
