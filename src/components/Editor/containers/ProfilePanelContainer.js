import ProfilePanel from "../components/ProfilePanel";
import { connect } from "react-redux";
import { setDisplayName } from "../../../actions/userDataActions";

const mapStateToProps = state => {
  return {
    displayName: state.userData.displayName,
    photoURL: "", //TODO: remove hack, was used for debugging//state.userData.photoURL,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setDisplayName: val => dispatch(setDisplayName(val)),
  };
};

const ProfilePanelContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfilePanel);

export default ProfilePanelContainer;
