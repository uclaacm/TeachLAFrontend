import {
  SET_CURRENT_LINE, SET_HOT_RELOAD, SET_CODE, SET_CODE_MIRROR_INSTANCE,
  CREATE_EDITOR_ID, FOCUS_ON_EDITOR, SET_LANGUAGE, SET_PROGRAM} from '../actions/textEditorActions'
import {supportedLanguage} from '../constants/helpers.js'
import {DEFAULT_LANGUAGE_PROGRAMS} from '../constants'
import Editor from '../components/Editor'

const initialState = {
  
}

function textEditorReducers(state =
{
  focusedEditorID: null,
  focusedEditor: null,
  editors: new Map(),
}, action){
  switch(action.type){
    case SET_HOT_RELOAD:
      state.hotReloading = action.hotReloading
      return state
    case SET_CURRENT_LINE:
      state.editors.get(action.id).currentLine = action.line
      return Object.assign({}, state, state.editors)
    case SET_PROGRAM:
      let editor = state.editors.get(action.id)
      if(!editor){
        editor = {
          program:DEFAULT_LANGUAGE_PROGRAMS[action.id],
          currentLine: 1,
        }
      }
      if(action.program){
        editor.program = action.program
        return Object.assign({}, state, state.editors)
      } else {
        console.log("test")
      }
      return state
    case SET_CODE:
      state.editors.get(action.id).program.code = action.code
      return Object.assign({}, state, state.editors)
    case SET_LANGUAGE:
      if(supportedLanguage(action.language)){
        state.editors.get(action.id).program.language = action.language
        return Object.assign({}, state, state.editors)
      }
      return state
    case SET_CODE_MIRROR_INSTANCE:
      if(action.instance){
        state.editors.get(action.id).cmInstance = action.instance
        return Object.assign({}, state, state.editors)
      }
      return state
    case CREATE_EDITOR_ID:
      let programInit = {
        program: null,
        currentLine: 1,
        cmInstance: null,
      }
      state.editors.set(action.id, programInit)
      return Object.assign({}, state, state.editors)
    case FOCUS_ON_EDITOR:
      let newFocusID = action.id
      let newFocus = state.editors.get(action.id)
      return Object.assign({}, state, {focusedEditorID: newFocusID, focusedEditor: newFocus})
    default:
      return state
  }
}

export default textEditorReducers
