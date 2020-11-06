import ClassPage from "../index.js";
import { connect } from "react-redux";
import { togglePanel } from "../../../actions/uiActions.js";
import { OPEN_PANEL_LEFT, CLOSED_PANEL_LEFT, PANEL_SIZE } from "../../../constants";

const mapStateToProps = (state) => {
  const left = (state.ui.panelOpen ? OPEN_PANEL_LEFT : CLOSED_PANEL_LEFT) + PANEL_SIZE;
  const calculatedWidth = state.ui.screenWidth - (left || 0);

  return {
    calculatedWidth,
    left,
    screenHeight: state.ui.screenHeight,
    panelOpen: state.ui.panelOpen,
    uid: state.userData.uid,
    // cid: state. ... .cid,
    cid: "CID",
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    togglePanel: () => dispatch(togglePanel()),
  };
};

const ClassPageContainer = connect(mapStateToProps, mapDispatchToProps)(ClassPage);

export default ClassPageContainer;
