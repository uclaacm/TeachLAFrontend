import { createStore, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import appReducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(appReducers, composeEnhancers(applyMiddleware(thunk)));

export default store;
