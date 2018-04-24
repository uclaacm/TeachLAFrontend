import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './containers/app';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux'
import app from './reducers'
import { Provider } from 'react-redux'

const store = createStore(app)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));

registerServiceWorker();
