import { DELETE_CLASS, LOAD_CLASSES, CLEAR_CLASSES, ADD_CLASS } from "../actions/classesActions.js";
import Immutable from "immutable";

let initialState = Immutable.List();

function classesReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CLASSES:
      return Immutable.fromJS(action.classes);
    case ADD_CLASS:
      return state.push(action.data);
    case DELETE_CLASS:
      //TODO: look up Immutable API on how to remove a nested key
      return state;
    case CLEAR_CLASSES:
      return Immutable.List();
    default:
      return state;
  }
}

export default classesReducer;
