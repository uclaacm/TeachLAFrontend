import {generateID, validID, nameToMode, supportedLanguage} from '../constants/helpers.js'
import {setOutput} from './outputActions'
import {LANGUAGE, CODE, LANGUAGE_MAP} from '../constants'
import Program from '../constants/Program.js'

// This action is a global setting across editors, and thus does not take an id
export const SET_HOT_RELOAD = 'SET_HOT_RELOAD'
export function setHotReload(hotReloading){
  return {type: SET_HOT_RELOAD, hotReloading: hotReloading}
}

export const SET_CURRENT_LINE = 'SET_CURRENT_LINE'
export function setCurrentLine(line, id){
  return {type: SET_CURRENT_LINE, id: id, line: line}
}

export const SET_CODE_MIRROR_INSTANCE = 'SET_CODE_MIRROR_INSTANCE'
export function setCodeMirrorInstance(codeMirrorInstance, id){
  return {type: SET_CODE_MIRROR_INSTANCE, id: id, instance: codeMirrorInstance}
}

export const SET_CODE = 'SET_CODE'
export function setCode(code, id){
  return {type: SET_CODE, id: id, code:code}
}

export const SET_PROGRAM = 'SET_PROGRAM'
export function setProgram(program, id){
  return {type: SET_PROGRAM, id: id, program: program}
}

export const SET_LANGUAGE = 'SET_WORKING_LANGUAGE'
export function setLanguage(language, id){
  return {type: SET_LANGUAGE, id: id, language: language}
}

export const CREATE_EDITOR_ID = 'CREATE_EDITOR_ID'
export function createEditorID(id){
  return {type: CREATE_EDITOR_ID, id: id}
}

/**
 * focusOnEditor - action concerned with focusing on a specific editor.  The editor
 * in focus is the editor window whose code is run on pressing the run code button, and
 * the window whose code is being updated in the redux store and uploaded to firestore.
 * The considerable symmetry of the properties contained within an editorInfo object, and the properties taken
 * in by the TextEditor component is by design. In fact, editor should contain everything needed
 * to retrieve an editor and all of its state information.
 *    @param {String} id - the unique identifier of the editor window
 * @return {Action}  - payload to be sent to the redux store to be processed. Please see
 * TextEditorReducers, case FOCUS_ON_EDITOR: for relevant code
 */
export const FOCUS_ON_EDITOR = 'FOCUS_ON_EDITOR'
export function focusOnEditor(id){
  return {type: FOCUS_ON_EDITOR, id: id}
}

export const SET_RUN_RESULT = 'SET_RUN_RESULT'
export function setRunResult(runResult){
  return {type: SET_RUN_RESULT, runResult: runResult}
}

/**
 * switchToProgram
 * @param  {String} programID - the identifier of the program to switch to.
 * As of now, it is the program title
 * @param  {String} [editorID=null] the editor ID, if supplied, specifies which text editor window to
 * change the program of, but usually we just want to change the window currently being worked on/focused
 * so if not supplied, we default the editorID to be the id of the focused program
 * @return {Promise} a promise that resolves once the program has been switched to, or rejects to an error
 */
export function switchToProgram(programID, editorID = null){
  return (dispatch, getState) => {
    let focusedID = getState().app.textEditorReducers.focusedEditorID
    if(!editorID){
      editorID = focusedID
    }
    if(validID(editorID, getState())){
      return new Promise(function(resolve, reject){
        try{
          let firestorePrograms = getState().app.userDataReducers.programs
          let progdoc = firestorePrograms.doc(programID)
          progdoc.get().then((docSnapshot) => {
            let program = new Program(docSnapshot)
            dispatch(setProgram(program, editorID))
            resolve()
          }).catch(function(error){
            reject(error)
          })
        }
        catch(error){
          reject(error)
        }
      })
    }
  }
}

/**
 * runCode - executed automatically with hot reloading, or on the pressing of the run code button.
 * Just inserts the same code into an iframe if HTML or javascript
 */
export function runCode(){
  return (dispatch, getState) => {
    let language = getState().app.textEditorReducers.focusedEditor.program.language
    let code = getState().app.textEditorReducers.focusedEditor.program.code
    if(language === "HTML" || language === "Javascript"){
      dispatch(setRunResult(code))
      dispatch(setOutput(code))
    }
  }
}
