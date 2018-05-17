import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import Root from './containers/root';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux'
import app from './reducers'
import { Provider } from 'react-redux'

const store = createStore(app)

ReactDOM.render(
  <Provider store={store}>
    <Root/>
  </Provider>,
  document.getElementById('root'));

registerServiceWorker();
