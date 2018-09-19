import React from 'react'
import CodeSection from '../components/Main.js'
import {connect} from 'react-redux'
import {setRunResult} from '../../../actions/outputActions'
import {setLanguage, setProgram, setCurrentLine,
  focusOnEditor, switchToProgram, runCode, createEditorID} from '../../../actions/textEditorActions'
import {getMostRecentProgram} from '../../../actions/userDataActions'
import {nameToMode, generateID} from '../../../constants/helpers.js'
import {DEFAULT_LANG, PYTHON} from '../../../constants'

const mapStateToProps = (state) => {
  return {
    mostRecentProgram: state.userData.mostRecentProgram || PYTHON,
    programs: state.programs || {errorMsg:"No programs found"},
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateMostRecentLanguage: (value) => dispatch(()=>console.log("updateMostRecentLanguage", value))
  }
}

const MainContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CodeSection)

export default MainContainer
