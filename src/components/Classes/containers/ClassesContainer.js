import Classes from "../index.js";
import { connect } from "react-redux";
import { loadInstrClasses, loadStudentClasses } from "../../../actions/classesActions.js";
import { setCurrentClass, setClassesLoaded } from "../../../actions/userDataActions.js";
import { togglePanel } from "../../../actions/uiActions.js";
import { OPEN_PANEL_LEFT, CLOSED_PANEL_LEFT, PANEL_SIZE } from "../../../constants";
import Immutable from "immutable";

const mapStateToProps = (state) => {
  const instrClasses = state.instrClasses.keySeq().map((id) => {
    let temp = state.instrClasses.get(id, Immutable.Map()).toJS();
    temp.cid = id;
    return temp;
  });
  const studentClasses = state.studentClasses.keySeq().map((id) => {
    let temp = state.studentClasses.get(id, Immutable.Map()).toJS();
    temp.cid = id;
    return temp;
  });

  const left = (state.ui.panelOpen ? OPEN_PANEL_LEFT : CLOSED_PANEL_LEFT) + PANEL_SIZE;
  const calculatedWidth = state.ui.screenWidth - (left || 0);

  return {
    studentClasses,
    instrClasses,
    classesLoaded: state.userData.classesLoaded,
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
    loadInstrClasses: (classes) => dispatch(loadInstrClasses(classes)),
    loadStudentClasses: (classes) => dispatch(loadStudentClasses(classes)),
    setClassesLoaded: (value) => dispatch(setClassesLoaded(value)),
  };
};

const ClassesContainer = connect(mapStateToProps, mapDispatchToProps)(Classes);

export default ClassesContainer;
