import Classes from "../index.js";
import { connect } from "react-redux";
import { setCurrentClass } from "../../../actions/userDataActions.js";
import { togglePanel } from "../../../actions/uiActions.js";
import { OPEN_PANEL_LEFT, CLOSED_PANEL_LEFT, PANEL_SIZE } from "../../../constants";
import Immutable from "immutable";

const mapStateToProps = (state) => {
  const classes = state.classes.keySeq().map((id) => {
    let temp = state.classes.get(id, Immutable.Map()).toJS();
    temp.cid = id;
    return temp;
  });

  let studClasses = [];
  let instrClasses = [];

  // Sort classes by whether user is instructor or student
  classes.forEach((thisClass) => {
    if (thisClass.instructors.includes(uid)) {
      instrClasses.push(thisClass);
    } else {
      studClasses.push(thisClass);
    }
  });

  // Test classes
  // studClasses.push(
  //   {
  //     name: "Python Class",
  //     instructors: ["Python Master"],
  //     cid: 2,
  //   }
  // );
  // instrClasses.push(
  //   {
  //     name: "Will's Class",
  //     instructors: ["Will O."],
  //     cid: 1,
  //   }
  // );

  const left = (state.ui.panelOpen ? OPEN_PANEL_LEFT : CLOSED_PANEL_LEFT) + PANEL_SIZE;
  const calculatedWidth = state.ui.screenWidth - (left || 0);

  return {
    studClasses,
    instrClasses,
    calculatedWidth,
    left,
    screenHeight: state.ui.screenHeight,
    panelOpen: state.ui.panelOpen,
    uid: state.userData.uid,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentClass: (value) => dispatch(setCurrentClass(value)),
    togglePanel: () => dispatch(togglePanel()),
  };
};

const ClassesContainer = connect(mapStateToProps, mapDispatchToProps)(Classes);

export default ClassesContainer;
