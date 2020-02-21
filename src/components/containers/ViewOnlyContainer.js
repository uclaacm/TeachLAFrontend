import ViewOnly from "../ViewOnly.js";
import { connect } from "react-redux";
import { setOutput } from "../../actions/outputActions.js";
import { setMostRecentProgram } from "../../actions/userDataActions.js";
import { setProgramCode, setProgramDirty } from "../../actions/programsActions.js";
import { togglePanel } from "../../actions/uiActions.js";
import { setTheme } from "../../actions/uiActions.js";
import { CLOSED_PANEL_LEFT, OPEN_PANEL_LEFT, PANEL_SIZE } from "../../constants";

const mapStateToProps = state => {
  const { mostRecentProgram } = state.userData;

  //program data should be an object representing the most recent program
  //should have 2 keys, code (which is the code) and langauge (which is the language the code is written it)
  const code = state.programs.getIn([mostRecentProgram, "code"], undefined);
  const dirty = state.programs.getIn([mostRecentProgram, "dirty"], false);
  const name = state.programs.getIn([mostRecentProgram, "name"], "untitled");
  const language = state.programs.getIn([mostRecentProgram, "language"], "txt");

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
    panelOpen: state.ui.panelOpen,
    left: (state.ui.panelOpen ? OPEN_PANEL_LEFT : CLOSED_PANEL_LEFT) + PANEL_SIZE,
    name,
    language,
    theme: state.ui.theme,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setMostRecentProgram: value => dispatch(setMostRecentProgram(value)),
    runCode: (code, language) => dispatch(setOutput(code, language)),
    cleanCode: program => dispatch(setProgramDirty(program, false)),
    togglePanel: () => dispatch(togglePanel()),
    setProgramCode: (program, code) => {
      dispatch(setProgramCode(program, code));
    },
    setTheme: theme => dispatch(setTheme(theme)),
  };
};

const ViewOnlyContainer = connect(mapStateToProps, mapDispatchToProps)(ViewOnly);

export default ViewOnlyContainer;
