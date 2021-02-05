import Classes from "../index.js";
import { connect } from "react-redux";
import { loadInstrClasses, loadStudentClasses } from "../../../actions/classesActions.js";
import { setCurrentClass } from "../../../actions/userDataActions.js";
import { togglePanel, setClassesLoaded, setOnInstrView } from "../../../actions/uiActions.js";
import { OPEN_PANEL_LEFT, CLOSED_PANEL_LEFT, PANEL_SIZE } from "../../../constants";
import Immutable from "immutable";

const mapStateToProps = (state) => {
  // TODO: Look over this part (instrClasses and studentClasses)
  const instrClasses = state.classes
    .get("instrClasses")
    .keySeq()
    .map((id) => {
      let temp = state.classes.get("instrClasses").get(id, Immutable.Map()).toJS();
      temp.cid = id;
      return temp;
    });
  const studentClasses = state.classes
    .get("studClasses")
    .keySeq()
    .map((id) => {
      let temp = state.classes.get("studClasses").get(id, Immutable.Map()).toJS();
      temp.cid = id;
      return temp;
    });

  const left = (state.ui.panelOpen ? OPEN_PANEL_LEFT : CLOSED_PANEL_LEFT) + PANEL_SIZE;
  const calculatedWidth = state.ui.screenWidth - (left || 0);

  return {
    studentClasses,
    instrClasses,
    calculatedWidth,
    left,
    screenHeight: state.ui.screenHeight,
    panelOpen: state.ui.panelOpen,
    classesLoaded: state.ui.classesLoaded,
    onInstrView: state.ui.onInstrView,
    classList: state.userData.classes,
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
    setOnInstrView: (value) => dispatch(setOnInstrView(value)),
  };
};

const ClassesContainer = connect(mapStateToProps, mapDispatchToProps)(Classes);

export default ClassesContainer;
