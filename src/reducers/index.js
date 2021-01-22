import { combineReducers } from "redux";
import userDataReducer from "./userDataReducer";
import programsReducer from "./programsReducer";
import instrClassesReducer from "./instrClassesReducer";
import studentClassesReducer from "./studentClassesReducer";
import classPageReducer from "./classPageReducer";
import outputReducer from "./outputReducer";
import uiReducer from "./uiReducer";

const appReducers = combineReducers({
  userData: userDataReducer,
  output: outputReducer,
  programs: programsReducer,
  studentClasses: studentClassesReducer,
  instrClasses: instrClassesReducer,
  classPage: classPageReducer,
  ui: uiReducer,
});

export default appReducers;
