import { connect } from 'react-redux';
import { togglePanel } from '../../../actions/uiActions';
import OpenPanelButton from '../OpenPanelButton';

const mapStateToProps = (state) => ({
  panelOpen: state.ui.panelOpen,
});

const mapDispatchToProps = (dispatch) => ({
  togglePanel: () => dispatch(togglePanel()),
});

const OpenPanelButtonContainer = connect(mapStateToProps, mapDispatchToProps)(OpenPanelButton);

export default OpenPanelButtonContainer;
