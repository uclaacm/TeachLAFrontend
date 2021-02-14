import { connect } from 'react-redux';
import OpenPanelButton from '../OpenPanelButton.js';
import { togglePanel } from '../../../actions/uiActions.js';

const mapStateToProps = (state) => ({
  panelOpen: state.ui.panelOpen,
});

const mapDispatchToProps = (dispatch) => ({
  togglePanel: () => dispatch(togglePanel()),
});

const OpenPanelButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OpenPanelButton);

export default OpenPanelButtonContainer;
