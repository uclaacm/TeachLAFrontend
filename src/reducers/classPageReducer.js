import {
  LOAD_CLASS,
  ADD_PROGRAM,
  DELETE_PROGRAM,
  LOAD_PROGRAMS,
} from "../actions/classPageActions.js";
import Immutable from "immutable";

let initialState = Immutable.Map({ programs: {} });

function classPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CLASS:
      // TODO: Figure out what the incoming data format is and make this match
      return Immutable.fromJS(action.data);
    case ADD_PROGRAM:
      return state.setIn([programs, action.program], Immutable.fromJS(action.data));
    case DELETE_PROGRAM:
      return state.deleteIn([programs, action.program]);
    case LOAD_PROGRAMS:
      return state.set("programs", Immutable.fromJS(action.programs));
    default:
      return state;
  }
}

export default classPageReducer;
