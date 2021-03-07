import { combineReducers } from "redux";
import userDataReducer from "./userDataReducer";
import programsReducer from "./programsReducer";
import classesReducer from "./classesReducer";
import classPageReducer from "./classPageReducer";
import outputReducer from "./outputReducer";
import uiReducer from "./uiReducer";

const appReducers = combineReducers({
  userData: userDataReducer,
  output: outputReducer,
  programs: programsReducer,
  classes: classesReducer,
  classPage: classPageReducer,
  ui: uiReducer,
});

export default appReducers;
