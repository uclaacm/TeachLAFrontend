import {
  SET_PROGRAM_CODE,
  SET_PROGRAM_LANGUAGE,
  SET_PROGRAM_NAME,
  SET_PROGRAM_THUMBNAIL,
  ADD_MONACO_COMMENTS,
  REMOVE_MONACO_COMMENTS,
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
    case SET_PROGRAM_NAME:
      return state.setIn([action.program, "name"], action.value);
    case SET_PROGRAM_THUMBNAIL:
      return state.setIn([action.program, "thumbnail"], action.value);
    case ADD_MONACO_COMMENTS:
      return state.updateIn([action.program, "monacoComments"], (comments) =>
        comments ? comments.concat(action.value) : action.value,
      );
    case REMOVE_MONACO_COMMENTS:
      return state.updateIn([action.program, "monacoComments"], (comments) =>
        comments ? comments.filter((c) => !action.value.includes(c)) : [],
      );
    case ADD_PROGRAM:
      return state.set(action.program, Immutable.fromJS(action.data));
    case DELETE_PROGRAM:
      return state.delete(action.program);
    case CLEAR_PROGRAMS:
      return Immutable.Map();
    default:
      return state;
  }
}

export default programsReducer;
