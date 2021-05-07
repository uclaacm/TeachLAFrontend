import { combineReducers } from 'redux';
import outputReducer from './outputReducer';
import programsReducer from './programsReducer';
import uiReducer from './uiReducer';
import userDataReducer from './userDataReducer';

const appReducers = combineReducers({
  userData: userDataReducer,
  output: outputReducer,
  programs: programsReducer,
  ui: uiReducer,
});

export default appReducers;
