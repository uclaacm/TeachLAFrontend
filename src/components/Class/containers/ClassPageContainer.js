import ClassPage from "../index.js";
import { connect } from "react-redux";
import { setMostRecentProgram } from "../../../actions/userDataActions.js";
import { loadPrograms } from "../../../actions/classPageActions";
import { togglePanel } from "../../../actions/uiActions.js";
import { OPEN_PANEL_LEFT, CLOSED_PANEL_LEFT, PANEL_SIZE } from "../../../constants";

const mapStateToProps = (state) => {
  const left = (state.ui.panelOpen ? OPEN_PANEL_LEFT : CLOSED_PANEL_LEFT) + PANEL_SIZE;
  const calculatedWidth = state.ui.screenWidth - (left || 0);
  const sketches = state.classPage
    .get("programs")
    .keySeq()
    .map((id) => {
      let temp = state.classPage.programs.get(id, Immutable.Map()).toJS();
      temp.key = id;
      return temp;
    });

  return {
    calculatedWidth,
    left,
    sketches,
    screenHeight: state.ui.screenHeight,
    panelOpen: state.ui.panelOpen,
    uid: state.userData.uid,
    cid: state.userData.currentClass,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadPrograms: (programs) => dispatch(loadPrograms(programs)),
    setMostRecentProgram: (value) => dispatch(setMostRecentProgram(value)),
    togglePanel: () => dispatch(togglePanel()),
  };
};

const ClassPageContainer = connect(mapStateToProps, mapDispatchToProps)(ClassPage);

export default ClassPageContainer;
