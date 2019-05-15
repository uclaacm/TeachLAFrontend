import Sketches from "../index.js";
import { connect } from "react-redux";
import { setMostRecentProgram } from "../../../actions/userDataActions.js";
import { togglePanel } from "../../../actions/uiActions.js";
import { PANEL_SIZE, CLOSED_PANEL_LEFT, OPEN_PANEL_LEFT } from "../../../constants";

const mapStateToProps = state => {
  const { mostRecentProgram } = state.userData;

  let listOfPrograms = [];

  //create list of jsons with 2 keys
  //name: the name of the sketch
  //language: language the sketch uses
  state.programs.keySeq().forEach(key => {
    listOfPrograms.push({
      name: key,
      language: state.programs.getIn([key, "language"], "HTML"),
      thumbnail: state.programs.getIn([key, "thumbnail"], 0),
    });
  });

  const left = (state.ui.panelOpen ? OPEN_PANEL_LEFT : CLOSED_PANEL_LEFT) + PANEL_SIZE;
  const calculatedWidth = state.ui.screenWidth - (left || 0);

  return {
    mostRecentProgram,
    listOfPrograms,
    calculatedWidth,
    left,
    screenHeight: state.ui.screenHeight,
    panelOpen: state.ui.panelOpen,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setMostRecentProgram: value => dispatch(setMostRecentProgram(value)),
    togglePanel: () => dispatch(togglePanel()),
  };
};

const SketchesContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sketches);

export default SketchesContainer;
