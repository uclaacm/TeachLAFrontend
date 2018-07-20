import React from 'react'
import CodeSection from '../components/Main.js'
import {connect} from 'react-redux'
import {setOutput} from '../../../actions/outputActions'
import {setLanguage, setProgram, setCurrentLine,
  focusOnEditor, switchToProgram, runCode, createEditorID} from '../../../actions/textEditorActions'
import {getMostRecentProgram} from '../../../actions/userDataActions'
import {nameToMode, generateID} from '../../../constants/helpers.js'
import {DEFAULT_LANG} from '../../../constants'

const mapStateToProps = (state, ownProps) => {
  let textEditorState = state.app.textEditorReducers
  let focusedEditor = textEditorState.focusedEditor
  return {
    language: (focusedEditor  && focusedEditor.program ? focusedEditor.program.language : DEFAULT_LANG),
    code: (focusedEditor && focusedEditor.program ? focusedEditor.code : ""),
    handleDropdownToggle: ownProps.handleDropdownToggle,
    paneVisible: ownProps.paneVisible,
    runResult: textEditorState.runResult,
    onSplitPaneChange: ownProps.splitPaneChangeHandler
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLanguage: (language) => {
      dispatch(setLanguage(language))
    },
    runCode: () => {
      dispatch(runCode())
    },
    clearOutput: () => {
      dispatch(setOutput(""))
    },
    focusOnEditor: (id) => {
      dispatch(focusOnEditor(id))
    },
    createWindow: (program) => {
      let id = generateID()
      dispatch(createEditorID(id))
      dispatch(setProgram(program, id))
      dispatch(focusOnEditor(id))
      if(program.currentLine){
        dispatch(setCurrentLine(program.currentLine, id))
      }
      else{
        dispatch(setCurrentLine(0, id))
      }
      return id
    },
    switchToProgram: (program, editorID) => {
      // clear run output
      dispatch(setOutput(""))
      return dispatch(switchToProgram(program, editorID))
    },
    getMostRecentProgram: () => {
      return dispatch(getMostRecentProgram())
    }
  }
}

const MainContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CodeSection)

export default MainContainer
