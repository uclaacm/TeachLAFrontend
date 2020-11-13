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
  let uid = state.userData.uid;
  // Sort classes by whether user is instructor or student
  classes.forEach((thisClass) => {
    if (thisClass.instructors.includes(uid)) {
      instrClasses.push(thisClass);
    } else {
      studClasses.push(thisClass);
    }
  });

  // Test class
  // studClasses.push(
  //   {
  //     name: "Class One",
  //     instructors: ["Will"],
  //     cid: "",
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
