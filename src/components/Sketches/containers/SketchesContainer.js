import Sketches from "../index.js";
import { connect } from "react-redux";
import { setMostRecentProgram } from "../../../actions/userDataActions.js";
import { togglePanel } from "../../../actions/uiActions.js";

const mapStateToProps = state => {
  const { mostRecentProgram } = state.userData;

  let listOfPrograms = [];

  //create list of jsons with 4 keys
  // key: the key of the sketch
  // name: the name of the sketch
  // language: language the sketch uses
  // thumbnail: thumbnail for sketch
  state.programs.keySeq().forEach(key => {
    listOfPrograms.push({
      key: key,
      name: state.programs.getIn([key, "name"], key),
      language: state.programs.getIn([key, "language"], "HTML"),
      thumbnail: state.programs.getIn([key, "thumbnail"], 0),
    });
  });

  return {
    mostRecentProgram,
    listOfPrograms,
    screenWidth: state.ui.screenWidth,
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
