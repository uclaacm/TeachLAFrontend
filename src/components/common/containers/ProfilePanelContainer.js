import { connect } from 'react-redux';
import { togglePanel } from '../../../reducers/uiReducer'
import { setDisplayName, setPhotoName } from '../../../actions/userDataActions';
import { DEFAULT_PHOTO_NAME, CLOSED_PANEL_LEFT, OPEN_PANEL_LEFT } from '../../../constants';
import * as fetch from '../../../lib/fetch';
import ProfilePanel from '../ProfilePanel';

const mapStateToProps = (state, ownProps) => ({
  displayName: state.userData.displayName,
  uid: state.userData.uid,
  photoName: state.userData.photoName || DEFAULT_PHOTO_NAME,
  screenHeight: state.ui.screenHeight,
  left: state.ui.panelOpen ? OPEN_PANEL_LEFT : CLOSED_PANEL_LEFT,
  theme: ownProps.theme,
  developerAcc: state.userData.developerAcc,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onThemeChange: ownProps.onThemeChange,
  collectUserPhoto: () => {},
  setDisplayName: (name, uid) => {
    try {
      fetch.updateUserData(uid, { displayName: name }).catch((err) => {
        console.error(err);
      });
    } catch (err) {
      console.error(err);
    }
    dispatch(setDisplayName(name));
  },
  setPhotoName: (name, uid) => {
    try {
      fetch
        .updateUserData(uid, { photoName: name })
        .then(() => {
          // TODO: if nothing went bad, keep the display name,
          // otherwise, change it back (or dont, depends how we wanna do it)
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (err) {
      console.error(err);
    }
    dispatch(setPhotoName(name));
  },
  togglePanel: () => {
    dispatch(togglePanel());
  },
});

const ProfilePanelContainer = connect(mapStateToProps, mapDispatchToProps)(ProfilePanel);

export default ProfilePanelContainer;
