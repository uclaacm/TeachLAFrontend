import ProfilePanel from "../ProfilePanel";
import { connect } from "react-redux";
import { setDisplayName, setPhotoName } from "../../../actions/userDataActions";
import { DEFAULT_PHOTO_NAME } from "../../../constants";

const mapStateToProps = (state, ownProps) => {
  return {
    displayName: state.userData.displayName,
    uid: state.userData.uid,
    photoName: state.userData.photoName || DEFAULT_PHOTO_NAME,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    collectUserPhoto: () => {},
    setDisplayName: name => dispatch(setDisplayName(name)),
    setPhotoName: name => dispatch(setPhotoName(name)),
  };
};

const ProfilePanelContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfilePanel);

export default ProfilePanelContainer;
