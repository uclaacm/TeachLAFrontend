import {
  ADD_STUDENT_CLASS,
  REMOVE_STUDENT_CLASS,
  LOAD_STUDENT_CLASSES,
  CLEAR_STUDENT_CLASSES,
} from "../actions/classesActions.js";
import Immutable from "immutable";

let initialState = Immutable.Map();

function studentClassesReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_STUDENT_CLASS:
      return state.set(action.cid, Immutable.fromJS(action.data));
    case REMOVE_STUDENT_CLASS:
      return state.delete(action.cid);
    case LOAD_STUDENT_CLASSES:
      return Immutable.fromJS(action.classes);
    case CLEAR_STUDENT_CLASSES:
      return Immutable.Map();
    default:
      return state;
  }
}

export default studentClassesReducer;
