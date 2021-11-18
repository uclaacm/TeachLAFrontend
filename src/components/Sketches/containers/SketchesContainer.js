import Immutable from 'immutable';
import { connect } from 'react-redux';
import { togglePanel } from '../../../actions/uiActions.js';
import { setMostRecentProgram } from '../../../actions/userDataActions.js';
import { OPEN_PANEL_LEFT, CLOSED_PANEL_LEFT, PANEL_SIZE } from '../../../constants';
import { getLanguageData } from '../../../util/languages/languages.js';
import Sketches from '../index.js';

const mapStateToProps = (state) => {
  const { mostRecentProgram } = state.userData;
  const programs = state.programs.keySeq().map((id) => {
    const temp = state.programs.get(id, Immutable.Map()).toJS();
    temp.key = id;
    temp.language = getLanguageData(temp.language);
    return temp;
  });

  const left = (state.ui.panelOpen ? OPEN_PANEL_LEFT : CLOSED_PANEL_LEFT) + PANEL_SIZE;
  const calculatedWidth = state.ui.screenWidth - (left || 0);

  return {
    mostRecentProgram,
    programs,
    calculatedWidth,
    left,
    screenHeight: state.ui.screenHeight,
    panelOpen: state.ui.panelOpen,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setMostRecentProgram: (value) => dispatch(setMostRecentProgram(value)),
  togglePanel: () => dispatch(togglePanel()),
});

const SketchesContainer = connect(mapStateToProps, mapDispatchToProps)(Sketches);

export default SketchesContainer;
