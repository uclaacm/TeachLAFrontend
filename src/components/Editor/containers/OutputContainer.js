import React from 'react'
import {connect} from 'react-redux'
import Output from '../components/Output.js'
// import {setWorkingLanguage, setMode} from '../../../actions/textEditorActions'
import { clearOutput } from '../../../actions/outputActions'
// import {nameToMode} from '../../../constants/helpers.js'

const mapStateToProps = (state, ownProps) => {
  const { mostRecentProgram } =state.userData

  return {
    runResult: state.programs.getIn([mostRecentProgram, "code"]),
    language: state.programs.getIn([mostRecentProgram, "language"])
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearOutput: () => {
    }
  }
}

const OutputContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Output)

export default OutputContainer
