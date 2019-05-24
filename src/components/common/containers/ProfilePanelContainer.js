import ProfilePanel from "../ProfilePanel";
import { connect } from "react-redux";
import { setDisplayName, setPhotoName } from "../../../actions/userDataActions";
import { togglePanel } from "../../../actions/uiActions";
import { DEFAULT_PHOTO_NAME, CLOSED_PANEL_LEFT, OPEN_PANEL_LEFT } from "../../../constants";

const mapStateToProps = (state, ownProps) => {
  return {
    displayName: state.userData.displayName,
    uid: state.userData.uid,
    photoName: state.userData.photoName || DEFAULT_PHOTO_NAME,
    screenHeight: state.ui.screenHeight,
    left: state.ui.panelOpen ? OPEN_PANEL_LEFT : CLOSED_PANEL_LEFT,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    collectUserPhoto: () => {},
    setDisplayName: name => dispatch(setDisplayName(name)),
    setPhotoName: name => dispatch(setPhotoName(name)),
    togglePanel: () => {
      dispatch(togglePanel());
    },
  };
};

const ProfilePanelContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfilePanel);

export default ProfilePanelContainer;
