import { connect } from 'react-redux';
import { togglePanel } from '../../../actions/uiActions.js';
import OpenPanelButton from '../OpenPanelButton.js';

const mapStateToProps = state => {
  return {
    panelOpen: state.ui.panelOpen,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    togglePanel: () => dispatch(togglePanel()),
  };
};

const OpenPanelButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OpenPanelButton);

export default OpenPanelButtonContainer;
