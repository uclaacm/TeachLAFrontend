import Immutable from 'immutable';
import { connect } from 'react-redux';
import { loadInstrClasses, loadStudentClasses } from '../../../actions/classesActions.js';
import { togglePanel, setClassesLoaded, setOnInstrView } from '../../../actions/uiActions.js';
import { setCurrentClass } from '../../../actions/userDataActions.js';
import { OPEN_PANEL_LEFT, CLOSED_PANEL_LEFT, PANEL_SIZE } from '../../../constants';
import Classes from '../index.js';

const mapStateToProps = (state) => {
  // TODO: Look over this part (instrClasses and studentClasses)
  const instrClasses = state.classes
    .get('instrClasses')
    .keySeq()
    .map((id) => {
      const temp = state.classes.get('instrClasses').get(id, Immutable.Map()).toJS();
      temp.cid = id;
      return temp;
    });
  const studentClasses = state.classes
    .get('studClasses')
    .keySeq()
    .map((id) => {
      const temp = state.classes.get('studClasses').get(id, Immutable.Map()).toJS();
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
    username: state.userData.displayName,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setCurrentClass: (value) => dispatch(setCurrentClass(value)),
  togglePanel: () => dispatch(togglePanel()),
  loadInstrClasses: (classes) => dispatch(loadInstrClasses(classes)),
  loadStudentClasses: (classes) => dispatch(loadStudentClasses(classes)),
  setClassesLoaded: (value) => dispatch(setClassesLoaded(value)),
  setOnInstrView: (value) => dispatch(setOnInstrView(value)),
});

const ClassesContainer = connect(mapStateToProps, mapDispatchToProps)(Classes);

export default ClassesContainer;
