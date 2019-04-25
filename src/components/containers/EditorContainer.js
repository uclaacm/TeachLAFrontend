import Editor from "../Editor.js";
import { connect } from "react-redux";
import { togglePanel } from "../../actions/uiActions.js";
import { CLOSED_PANEL_LEFT, OPEN_PANEL_LEFT } from "../../constants";

const mapStateToProps = state => {
  return {
    screenWidth: state.ui.screenWidth,
    screenHeight: state.ui.screenHeight,
    panelOpen: state.ui.panelOpen,
    panelLeft: state.ui.panelOpen ? OPEN_PANEL_LEFT : CLOSED_PANEL_LEFT,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    togglePanel: () => {
      dispatch(togglePanel());
    },
  };
};

const EditorPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Editor);

export default EditorPage;
