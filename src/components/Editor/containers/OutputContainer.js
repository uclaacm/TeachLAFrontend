import { connect } from "react-redux";
import Output from "../components/Output.js";

const mapStateToProps = state => {
  const { mostRecentProgram } = state.userData;
  return {
    mostRecentProgram,
    runResult: state.programs.getIn([mostRecentProgram, "code"]),
    language: state.programs.getIn([mostRecentProgram, "language"]),
    screenHeight: state.ui.screenHeight,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearOutput: () => {},
  };
};

const OutputContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Output);

export default OutputContainer;
