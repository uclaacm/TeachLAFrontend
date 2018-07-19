import TextEditor from '../components/TextEditor'
import {connect} from 'react-redux'
import {setCurrentLine, setCodeMirrorInstance, setCode} from '../../../actions/textEditorActions'
import {programUpload} from '../../../actions/userDataActions'

const mapStateToProps = (state, ownProps) => {
  /* the reason for the decoupling of code, language, and and currentLine from the actual remote sketch
     is because it is desirable for the local state to persist in working if a network error should develop */
  let globalEditorInfo = state.app.textEditorReducers
  let editor = globalEditorInfo.editors.get(ownProps.id)
  if(editor){
    return {
      currentLine: editor.currentLine,
      hotReload: globalEditorInfo.hotReloading,
      code: editor.program ? editor.program.code : "",
      language: editor.program ? editor.program.language : "Python",
      id: ownProps.id,
      cmInstance: editor.cmInstance,
    }
  }
  else{
    return {
      id: ownProps.id,
      hotReload: globalEditorInfo.hotReloading,
      code: null,
      language: null,
      currentLine: null,
      cmInstance: null,
    }
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setCurrentLineInStore: (nextState) => {
      dispatch(setCurrentLine(nextState, ownProps.id))
    },
    setCodeMirrorInstance: (instance, id) => {
      dispatch(setCodeMirrorInstance(instance, id))
    },
    runCode: (code) => {
      ownProps.runCode(code)
    },
    uploadCode: (code, id) => {
      dispatch(programUpload({code: code, lastModified: new Date(Date.now())}, id))
    },
    updateCode: (code, id) => {
      dispatch(setCode(code, id))
    }
  }
}

const TextEditorContainer =
connect(mapStateToProps,
mapDispatchToProps)
(TextEditor)

export default TextEditorContainer
