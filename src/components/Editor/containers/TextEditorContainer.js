import TextEditor from '../components/TextEditor'
import {connect} from 'react-redux'
import { setProgramCode } from '../../../actions/programsActions.js'

const mapStateToProps = (state) => {

  console.log(state.userData.mostRecentProgram)
  const mostRecentProgram = state.userData.mostRecentProgram

  const programs = state.programs

  console.log(programs.toJS(), mostRecentProgram, programs.getIn([mostRecentProgram], ""))
  return {
    code: programs.getIn([mostRecentProgram, "code"], ""),
    language: programs.getIn([mostRecentProgram, "language"], "python"),
    mostRecentProgram,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setProgramCode: (program, code) => {
      dispatch(setProgramCode(program, code))
    },
  }
}

const TextEditorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TextEditor)

export default TextEditorContainer
