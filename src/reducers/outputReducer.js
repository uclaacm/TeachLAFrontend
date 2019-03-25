import {
  CLEAR_OUTPUT,
  SET_RUN_RESULT,
  SET_OUTPUT_LANGUAGE,
  SET_OUTPUT,
} from "../actions/outputActions";
import { PYTHON } from "../constants";

const initialState = {
  runResult: "",
  language: PYTHON,
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

export default outputReducer;
