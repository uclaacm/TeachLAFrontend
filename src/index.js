import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/index.css';
import Root from './components/containers/AppContainer.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore} from 'redux'
import appReducers from './reducers'
import config from './firebase'
import { Provider } from 'react-redux'
import firebase from 'firebase'
// import Enzyme from 'enzyme'
// import Adapter from 'enzyme-adapter-react-16'

firebase.initializeApp(config);

const store = createStore(appReducers)

ReactDOM.render(
  <Provider store={store}>
    <Root/>
  </Provider>,
  document.getElementById('root'));

registerServiceWorker();
