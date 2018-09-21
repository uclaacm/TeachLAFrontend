import React from 'react'
import Main from '../components/Main.js'
import {connect} from 'react-redux'
import {setRunResult} from '../../../actions/outputActions'
import {setLanguage, setProgram, setCurrentLine,
  focusOnEditor, switchToProgram, runCode, createEditorID} from '../../../actions/textEditorActions'
import {getMostRecentProgram} from '../../../actions/userDataActions'
// import {nameToMode, generateID} from '../../../constants/helpers.js'
import {DEFAULT_LANG, PYTHON} from '../../../constants'
import Immutable from 'immutable'

const mapStateToProps = (state) => {
  return {
    mostRecentProgram: state.userData.mostRecentProgram || PYTHON,
    programs: state.programs,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateMostRecentLanguage: (value) => dispatch(()=>console.log("updateMostRecentLanguage", value)),
    runCode: (code, language) => dispatch(setOutput(code, language))
  }
}

const MainContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)

export default MainContainer
