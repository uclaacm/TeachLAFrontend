import Main from "../components/Main.js";
import { connect } from "react-redux";
import { setOutput } from "../../../actions/outputActions.js";
import { setMostRecentProgram, setProgramDirty } from "../../../actions/userDataActions.js";

const mapStateToProps = state => {
  const { mostRecentProgram, dirty } = state.userData;

  //program data should be an object representing the most recent program
  //should have 2 keys, code (which is the code) and langauge (which is the language the code is written it)
  const code = state.programs.getIn([mostRecentProgram, "code"], undefined);

  let listOfPrograms = [];

  state.programs.keySeq().forEach(key => listOfPrograms.push(key));

  return {
    uid: state.userData.uid,
    mostRecentProgram,
    code,
    listOfPrograms,
    screenWidth: state.ui.screenWidth,
    screenHeight: state.ui.screenHeight,
    dirty,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setMostRecentProgram: value => dispatch(setMostRecentProgram(value)),
    runCode: (code, language) => dispatch(setOutput(code, language)),
    cleanCode: () => dispatch(setProgramDirty(false)),
  };
};

const MainContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);

export default MainContainer;
