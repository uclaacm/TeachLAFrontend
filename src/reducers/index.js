import { combineReducers } from "redux";
import userDataReducer from "./userDataReducer";
import programsReducer from "./programsReducer";
import outputReducer from "./outputReducer";
import uiReducer from "./uiReducer";
import classReducer from "./classReducer";
import classesReducer from "./classesReducer";

const appReducers = combineReducers({
  userData: userDataReducer,
  output: outputReducer,
  programs: programsReducer,
  ui: uiReducer,
  classes: classesReducer,
  class: classReducer,
});

export default appReducers;
