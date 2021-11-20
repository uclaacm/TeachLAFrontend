import Immutable, { Map } from 'immutable';

import {
  ADD_STUDENT_CLASS,
  REMOVE_STUDENT_CLASS,
  LOAD_STUDENT_CLASSES,
  CLEAR_STUDENT_CLASSES,
  ADD_INSTR_CLASS,
  REMOVE_INSTR_CLASS,
  LOAD_INSTR_CLASSES,
  CLEAR_INSTR_CLASSES,
  CLEAR_CLASSES,
} from '../actions/classesActions.js';

const initialState = Map({ studClasses: Map(), instrClasses: Map() });

function classesReducer(state = initialState, action) {
  switch (action.type) {
  case ADD_STUDENT_CLASS:
    return state.setIn(['studClasses', action.cid], Immutable.fromJS(action.data));
  case REMOVE_STUDENT_CLASS:
    return state.deleteIn(['studClasses', action.cid]);
  case LOAD_STUDENT_CLASSES:
    // TODO: update this to make sure classes are indexed by class ID
    // Want to extract CIDs from action.classes and use them as the keys.
    const studClassesKeyed = {};
    action.classes.forEach((classObj) => {
      studClassesKeyed[classObj.cid] = classObj;
    });
    return state.set('studClasses', Immutable.fromJS(studClassesKeyed));
  case CLEAR_STUDENT_CLASSES:
    return state.set('studClasses', Map());
  case ADD_INSTR_CLASS:
    return state.setIn(['instrClasses', action.cid], Immutable.fromJS(action.data));
  case REMOVE_INSTR_CLASS:
    return state.deleteIn(['instrClasses', action.cid]);
  case LOAD_INSTR_CLASSES:
    // TODO: update this to make sure classes are indexed by class ID
    const instrClassesKeyed = {};
    action.classes.forEach((classObj) => {
      instrClassesKeyed[classObj.cid] = classObj;
    });
    return state.set('instrClasses', Immutable.fromJS(instrClassesKeyed));
  case CLEAR_INSTR_CLASSES:
    return state.set('instrClasses', Map());
  case CLEAR_CLASSES:
    return Map({ studClasses: Map(), instrClasses: Map() });
  default:
    return state;
  }
}

export default classesReducer;
