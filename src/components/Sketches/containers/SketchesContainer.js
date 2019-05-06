import Sketches from "../index.js";
import { connect } from "react-redux";
import { setMostRecentProgram } from "../../../actions/userDataActions.js";
import { togglePanel } from "../../../actions/uiActions.js";
import Immutable from "immutable";

const mapStateToProps = state => {
  const { mostRecentProgram } = state.userData;
  const programs = state.programs.keySeq().map(id => {
    let temp = state.programs.get(id, Immutable.Map()).toJS();
    temp.key = id;
    return temp;
  });

  return {
    mostRecentProgram,
    programs,
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
