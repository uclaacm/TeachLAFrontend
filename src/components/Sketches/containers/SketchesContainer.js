import { connect } from 'react-redux';
import { togglePanel } from '../../../reducers/uiReducer'
import { setMostRecentProgram } from '../../../actions/userDataActions';
import { OPEN_PANEL_LEFT, CLOSED_PANEL_LEFT, PANEL_SIZE } from '../../../constants';
import * as fetch from '../../../lib/fetch';
import { getLanguageData } from '../../../util/languages/languages';
import Sketches from '../index';

const mapStateToProps = (state) => {
  const { mostRecentProgram } = state.userData;
  const programs = Object.entries(state.programs).map(([k, v]) => {
    return { ...v, key: k, language: getLanguageData(v.language) }
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
    uid: state.userData.uid,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setMostRecentProgram: (value, uid) => {
    try {
      fetch.updateUserData(uid, { mostRecentProgram: value }).catch((err) => {
        console.error(err);
      });
    } catch (err) {
      console.error(err);
    }
    dispatch(setMostRecentProgram(value));
  },
  togglePanel: () => dispatch(togglePanel()),
});

const SketchesContainer = connect(mapStateToProps, mapDispatchToProps)(Sketches);

export default SketchesContainer;
