import Main from "../components/Main.js";
import { connect } from "react-redux";
import { setOutput } from "../../../actions/outputActions.js";
import { setMostRecentProgram } from "../../../actions/userDataActions.js";

const mapStateToProps = state => {
  return {
    mostRecentProgram: state.userData.mostRecentProgram,
    programs: state.programs,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setMostRecentProgram: value => dispatch(setMostRecentProgram(value)),
    runCode: (code, language) => dispatch(setOutput(code, language)),
  };
};

const MainContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);

export default MainContainer;
