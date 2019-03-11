import { combineReducers } from "redux";
import userDataReducer from "./userDataReducer";
import programsReducer from "./programsReducer";
import outputReducer from "./outputReducer";
import uiReducer from "./uiReducer";

const appReducers = combineReducers({
  userData: userDataReducer,
  output: outputReducer,
  programs: programsReducer,
  ui: uiReducer,
});

export default appReducers;
