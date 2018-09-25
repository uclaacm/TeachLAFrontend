import {connect} from 'react-redux'
import Output from '../components/Output.js'

const mapStateToProps = (state, ownProps) => {
  const { mostRecentProgram } =state.userData

  return {
    runResult: state.programs.getIn([mostRecentProgram, "code"]),
    language: state.programs.getIn([mostRecentProgram, "language"])
  }
}

const mapDispatchToProps = dispatch => {
  return {
    clearOutput: () => {
    }
  }
}

const OutputContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Output);

export default OutputContainer;
