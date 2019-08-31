import { ADD_CLASS, REMOVE_CLASS, LOAD_CLASSES, CLEAR_CLASSES } from "../actions/classesActions.js";
import Immutable from "immutable";

let initialState = Immutable.Map();

function classesReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_CLASS:
      return state.set(action.classKey, Immutable.fromJS(action.data));
    case REMOVE_CLASS:
      return state.delete(action.classKey);
    case LOAD_CLASSES:
      return Immutable.fromJS(action.programs);
    case CLEAR_CLASSES:
      return Immutable.Map();
    default:
      return state;
  }
}

export default classesReducer;
