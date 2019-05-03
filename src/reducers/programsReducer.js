import {
  SET_PROGRAM_CODE,
  SET_PROGRAM_LANGUAGE,
  DELETE_PROGRAM,
  LOAD_PROGRAMS,
  CLEAR_PROGRAMS,
  SET_PROGRAM_DIRTY,
  ADD_PROGRAM,
} from "../actions/programsActions.js";
import Immutable from "immutable";

let initialState = Immutable.Map();

function programsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PROGRAMS:
      return Immutable.fromJS(action.programs);
    case SET_PROGRAM_CODE:
      return state.setIn([action.program, "code"], action.value);
    case SET_PROGRAM_LANGUAGE:
      return state.setIn([action.program, "language"], action.value);
    case SET_PROGRAM_DIRTY:
      return state.setIn([action.program, "dirty"], action.value);
    case ADD_PROGRAM:
      return state.set(action.program, Immutable.fromJS(action.data));
    case DELETE_PROGRAM:
      //TODO: look up Immutable API on how to remove a nested key
      return state;
    case CLEAR_PROGRAMS:
      return Immutable.Map();
    default:
      return state;
  }
}

export default programsReducer;
