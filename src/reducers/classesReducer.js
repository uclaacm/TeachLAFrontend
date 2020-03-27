import { ADD_CLASS } from "../actions/classesActions.js";
import Immutable from "immutable";

let initialState = Immutable.Map();

function classesReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_CLASS:
      return state.set(action.classKey, Immutable.fromJS(action.data));
    default:
      return state;
  }
}

export default classesReducer;
