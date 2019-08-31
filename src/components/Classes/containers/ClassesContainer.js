import Classes from "../index.js";
import { connect } from "react-redux";
import { togglePanel } from "../../../actions/uiActions.js";
// import Immutable from "immutable";
import { PANEL_SIZE, CLOSED_PANEL_LEFT, OPEN_PANEL_LEFT } from "../../../constants";

const mapStateToProps = state => {
  let classes = [];

  // Dummy data
  for (var i = 0; i < 5; i++) {
    classes.push({
      name: i.toString(),
      thumbnail: i,
    });
  }
  // const classes = state.programs.keySeq().map(id => {
  //   let temp = state.programs.get(id, Immutable.Map()).toJS();
  //   temp.key = id;
  //   return temp;
  // });

  const left = (state.ui.panelOpen ? OPEN_PANEL_LEFT : CLOSED_PANEL_LEFT) + PANEL_SIZE;
  const calculatedWidth = state.ui.screenWidth - (left || 0);

  return {
    classes,
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

const ClassesContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Classes);

export default ClassesContainer;
