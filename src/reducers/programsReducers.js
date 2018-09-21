// import {
  // SET_CURRENT_LINE, SET_HOT_RELOAD, SET_CODE, SET_CODE_MIRROR_INSTANCE,
  // CREATE_EDITOR_ID, FOCUS_ON_EDITOR, SET_LANGUAGE, SET_PROGRAM} from '../actions/textEditorActions'
import {
  SET_PROGRAM_CODE, SET_PROGRAM_LANGUAGE, DELETE_PROGRAM
} from '../actions/programsActions.js'
import {DEFAULT_LANGUAGE_PROGRAMS} from '../constants'
import Immutable from 'immutable'

let initialState = Immutable.Map()

//add each default language program to the initial state
Object.keys(DEFAULT_LANGUAGE_PROGRAMS).forEach(key => {
  initialState.set(key, DEFAULT_LANGUAGE_PROGRAMS[key])
})



function programsReducers(state = initialState, action){
  switch(action.type){
    case SET_PROGRAM_CODE:
      return state.setIn([action.program, "code"], action.value)
    case SET_PROGRAM_LANGUAGE:
      return state.setIn([action.program, "language"], action.value)
    case DELETE_PROGRAM:
    //TODO: look up Immutable API on how to remove a nested key
      return state
    default:
      return state
  }
}

export default programsReducers
