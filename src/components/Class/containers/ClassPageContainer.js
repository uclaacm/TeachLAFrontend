import ClassPage from '../index.js';
import { connect } from 'react-redux';
import { setMostRecentProgram } from '../../../actions/userDataActions.js';
import { addInstrClass, addStudentClass } from '../../../actions/classesActions.js';
import { addProgram } from '../../../actions/programsActions.js';
import { togglePanel } from '../../../actions/uiActions.js';
import { OPEN_PANEL_LEFT, CLOSED_PANEL_LEFT, PANEL_SIZE } from '../../../constants';

const mapStateToProps = (state) => {
  const left = (state.ui.panelOpen ? OPEN_PANEL_LEFT : CLOSED_PANEL_LEFT) + PANEL_SIZE;
  const calculatedWidth = state.ui.screenWidth - (left || 0);
  const cid = state.userData.currentClass;
  const blankClass = {
    name: '',
    creator: '',
    thumbnail: 0,
    programData: null,
    programs: null,
    wid: '',
    userData: {},
    instructors: [],
    members: null,
    cid: '',
  };

  return {
    calculatedWidth,
    left,
    screenHeight: state.ui.screenHeight,
    panelOpen: state.ui.panelOpen,
    uid: state.userData.uid,
    cid,
    classData: state.classes.getIn(['instrClasses', cid])?.toJS() || state.classes.getIn(['studClasses', cid])?.toJS() || blankClass,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addInstrClass: (cid, data) => dispatch(addInstrClass(cid, data)),
    addStudentClass: (cid, data) => dispatch(addStudentClass(cid, data)),
    addProgram: (program, value) => dispatch(addProgram(program, value)),
    setMostRecentProgram: (value) => dispatch(setMostRecentProgram(value)),
    togglePanel: () => dispatch(togglePanel()),
  };
};

const ClassPageContainer = connect(mapStateToProps, mapDispatchToProps)(ClassPage);

export default ClassPageContainer;
