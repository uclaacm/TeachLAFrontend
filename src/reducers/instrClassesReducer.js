import {
  ADD_INSTR_CLASS,
  REMOVE_INSTR_CLASS,
  LOAD_INSTR_CLASSES,
  CLEAR_INSTR_CLASSES,
} from "../actions/classesActions.js";
import Immutable from "immutable";

let initialState = Immutable.Map();

function instrClassesReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_INSTR_CLASS:
      return state.set(action.cid, Immutable.fromJS(action.data));
    case REMOVE_INSTR_CLASS:
      return state.delete(action.cid);
    case LOAD_INSTR_CLASSES:
      return Immutable.fromJS(action.classes);
    case CLEAR_INSTR_CLASSES:
      return Immutable.Map();
    default:
      return state;
  }
}

export default instrClassesReducer;
