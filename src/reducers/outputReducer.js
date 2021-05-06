import {
  CLEAR_OUTPUT,
  SET_RUN_RESULT,
  SET_OUTPUT_LANGUAGE,
  SET_OUTPUT,
} from "../actions/outputActions";
import { getLanguageData } from "../util/languages/languages.js";

const initialState = {
  runResult: "",
  language: getLanguageData("python"),
};

function outputReducer(state = initialState, action) {
  switch (action.type) {
    case CLEAR_OUTPUT:
      return initialState;
    case SET_RUN_RESULT:
      return Object.assign({}, state, { runResult: action.value });
    case SET_OUTPUT_LANGUAGE:
      return Object.assign({}, state, { language: action.value });
    case SET_OUTPUT:
      return Object.assign({}, state, { runResult: action.runResult, language: action.language });
    default:
      return state;
  }
}

export {
  initialState,
  outputReducer,
}

export default outputReducer;
