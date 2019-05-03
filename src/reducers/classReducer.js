import { LOAD_CLASS, CLEAR_CLASS } from "../actions/classActions.js";
import Immutable from "immutable";

let initialState = Immutable.Map();

function classesReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CLASS:
      return Immutable.fromJS(action.myClass);
    case CLEAR_CLASS:
      return Immutable.Map();
    default:
      return state;
  }
}

export default classesReducer;
