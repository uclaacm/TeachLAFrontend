import RunButton from '../components/RunButton'
import {connect} from 'react-redux'
import { setOutput } from '../../../actions/outputActions'
import {PYTHON} from '../../../constants'

const mapStateToProps = (state) => {
  const mostRecentProgram = state.userData.mostRecentProgram

  const programs = state.programs

  return {
    code: programs.getIn([mostRecentProgram, "code"], ""),
    language: programs.getIn([mostRecentProgram, "language"], PYTHON),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setOutput: (language, code) => {
      dispatch(setOutput({language, code}))
    },
  }
}

const RunButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RunButton)

export default RunButtonContainer
