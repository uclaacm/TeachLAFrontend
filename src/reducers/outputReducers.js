import { CLEAR_OUTPUT, SET_RUN_RESULT } from "../actions/outputActions";

function outputReducers(
  state = {
    runResult: null,
  },
  action,
) {
  switch (action.type) {
    case CLEAR_OUTPUT:
      return Object.assign({}, state, { runResult: null });
    case SET_RUN_RESULT:
      return Object.assign({}, state, { runResult: action.runResult });
    default:
      return state;
  }
}

export default outputReducers;
