import ClassPage from '../index.js';
import { connect } from 'react-redux';
import { setMostRecentProgram } from '../../../actions/userDataActions.js';
import { addProgram } from '../../../actions/programsActions.js';
import { togglePanel } from '../../../actions/uiActions.js';
import { OPEN_PANEL_LEFT, CLOSED_PANEL_LEFT, PANEL_SIZE } from '../../../constants';

const mapStateToProps = (state) => {
  const left = (state.ui.panelOpen ? OPEN_PANEL_LEFT : CLOSED_PANEL_LEFT) + PANEL_SIZE;
  const calculatedWidth = state.ui.screenWidth - (left || 0);
  // TODO: fix this
  // const sketches = state.classPage.get("programs").keySeq().map((id) => {
  //     let temp = state.classPage.programs.get(id, Immutable.Map()).toJS();
  //     temp.key = id;
  //     return temp;
  //   });

  return {
    calculatedWidth,
    left,
    // sketches,
    screenHeight: state.ui.screenHeight,
    panelOpen: state.ui.panelOpen,
    uid: state.userData.uid,
    cid: state.userData.currentClass,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // loadClass: (classData) => dispatch(loadClass(classData)),
    addProgram: (program, value) => dispatch(addProgram(program, value)),
    setMostRecentProgram: (value) => dispatch(setMostRecentProgram(value)),
    togglePanel: () => dispatch(togglePanel()),
  };
};

const ClassPageContainer = connect(mapStateToProps, mapDispatchToProps)(ClassPage);

export default ClassPageContainer;
