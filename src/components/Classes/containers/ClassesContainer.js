import Classes from "../index.js";
import { connect } from "react-redux";
import { togglePanel } from "../../../actions/uiActions.js";
import { OPEN_PANEL_LEFT, CLOSED_PANEL_LEFT, PANEL_SIZE } from "../../../constants";
// import Immutable from "immutable";

const mapStateToProps = state => {
  let studClasses = [];
  let instrClasses = [];

  // Dummy data
  for (var i = 0; i < 3; i++) {
    studClasses.push({
      key: i,
      name: "The class name would go here, if we had one",
      instructor: "Will",
      thumbnail: i,
    });
  }

  instrClasses.push({ key: 8, name: "This is my class.", instructor: "Myself", thumbnail: 2 });
  // const classes = state.programs.keySeq().map(id => {
  //   let temp = state.programs.get(id, Immutable.Map()).toJS();
  //   temp.key = id;
  //   return temp;
  // });

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
