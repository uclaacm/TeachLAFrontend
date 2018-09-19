import {
  SET_CURRENT_LINE, SET_HOT_RELOAD, SET_CODE, SET_CODE_MIRROR_INSTANCE,
  CREATE_EDITOR_ID, FOCUS_ON_EDITOR, SET_LANGUAGE, SET_PROGRAM} from '../actions/textEditorActions'
import {DEFAULT_LANGUAGE_PROGRAMS} from '../constants'
import Editor from '../components/Editor'

const initialState = {
  
}

function textEditorReducers(state = {
  ...DEFAULT_LANGUAGE_PROGRAMS
}, action){
  switch(action.type){
    default:
      return state
  }
}

export default textEditorReducers
