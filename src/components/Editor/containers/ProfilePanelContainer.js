import ProfilePanel from "../components/ProfilePanel";
import { connect } from "react-redux";
import { setDisplayName, setPhotoName } from "../../../actions/userDataActions";
import { DEFAULT_PHOTO_NAME } from "../../../constants";

const mapStateToProps = (state, ownProps) => {
  return {
    displayName: state.userData.displayName,
    uid: state.userData.uid,
    photoName: state.userData.photoName || DEFAULT_PHOTO_NAME,
    // photoURL: state.userData.photoURL,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    // collectUserDisplayName: () => {
    //   let displayNameElement = document.querySelector("." + DISPLAY_NAME_WRAPPER);
    //   let input = document.querySelector("." + DISPLAY_NAME_INPUT);
    //   const handleEnter = event => {
    //     handleOnEnter(event, dispatch, displayNameElement);
    //   };
    //   if (!input) {
    //     displayNameElement.addEventListener("keyup", handleEnter);
    //     displayNameElement.innerHTML = `
    //       <input class=${DISPLAY_NAME_INPUT} type="text"/>
    //     `;
    //   }
    // },
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
