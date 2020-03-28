import { CREATE_CLASS, DELETE_CLASS } from "../actions/classesActions.js";
import Immutable from "immutable";

let initialState = Immutable.Map();

function classesReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_CLASS:
      return state.set(action.classKey, Immutable.fromJS(action.data));
    case DELETE_CLASS:
      return state.delete(action.classKey);
    default:
      return state;
  }
}

export default classesReducer;
