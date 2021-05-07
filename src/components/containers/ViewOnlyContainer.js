import { connect } from 'react-redux';
import { setOutput } from '../../actions/outputActions.js';
import { setProgramCode, setProgramLanguage } from '../../actions/programsActions.js';
import { togglePanel } from '../../actions/uiActions.js';
import { setTheme } from '../../actions/uiActions.js';
import { CLOSED_PANEL_LEFT, OPEN_PANEL_LEFT, PANEL_SIZE } from '../../constants';
import ViewOnly from '../ViewOnly.js';

const mapStateToProps = (state) => {
  const { mostRecentProgram } = state.userData;
  return {
    uid: state.userData.uid,
    screenWidth: state.ui.screenWidth,
    screenHeight: state.ui.screenHeight,
    panelOpen: state.ui.panelOpen,
    left: (state.ui.panelOpen ? OPEN_PANEL_LEFT : CLOSED_PANEL_LEFT) + PANEL_SIZE,
    theme: state.ui.theme,
    mostRecentProgram,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    runCode: (code, language) => dispatch(setOutput(code, language)),
    togglePanel: () => dispatch(togglePanel()),
    setProgramCode: (program, code) => {
      dispatch(setProgramCode(program, code));
    },
    setProgramLanguage: (program, lang) => {
      dispatch(setProgramLanguage(program, lang));
    },
    setTheme: (theme) => dispatch(setTheme(theme)),
  };
};

const ViewOnlyContainer = connect(mapStateToProps, mapDispatchToProps)(ViewOnly);

export default ViewOnlyContainer;
