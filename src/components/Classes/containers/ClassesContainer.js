import Classes from "../index.js";
import { connect } from "react-redux";
import { togglePanel } from "../../../actions/uiActions.js";
import { OPEN_PANEL_LEFT, CLOSED_PANEL_LEFT, PANEL_SIZE } from "../../../constants";
import Immutable from "immutable";

const mapStateToProps = state => {
  let studClasses = [];
  let instrClasses = [];

  const classes = state.classes.keySeq().map(id => {
    let temp = state.classes.get(id, Immutable.Map()).toJS();
    temp.key = id;
    return temp;
  });

  // Sort classes by whether user is instructor or student
  classes.forEach(element => {
    if (element.isInstr) {
      instrClasses.push(element);
    } else {
      studClasses.push(element);
    }
  });

  const left = (state.ui.panelOpen ? OPEN_PANEL_LEFT : CLOSED_PANEL_LEFT) + PANEL_SIZE;
  const calculatedWidth = state.ui.screenWidth - (left || 0);

  return {
    studClasses,
    instrClasses,
    calculatedWidth,
    left,
    screenHeight: state.ui.screenHeight,
    panelOpen: state.ui.panelOpen,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    togglePanel: () => dispatch(togglePanel()),
  };
};

const ClassesContainer = connect(mapStateToProps, mapDispatchToProps)(Classes);

export default ClassesContainer;
