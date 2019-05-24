/*
	used to link state to App which contains the router, could link functions, but rather do that in each individual container
*/
import App from "../app.js";
import { connect } from "react-redux";
import { loadUserData, clearUserData, loadFailure } from "../../actions/userDataActions.js";
import { loadPrograms, clearPrograms } from "../../actions/programsActions";
import { screenResize } from "../../actions/uiActions";
import * as fetch from "../../lib/fetch.js";

const mapStateToProps = state => {
  return {
    uid: state.userData.uid,
    errorMsg: state.userData.error,
    screenWidth: state.ui.screenWidth,
    screenHeight: state.ui.screenHeight,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadUserData: async (uid, onFailure) => {
      const { ok, data /*error*/ } = await fetch.getUserData(uid, true);
      //if the request went fine, and there's a non empty userData
      if (ok && data && data.userData && Object.keys(data.userData).length) {
        if (data.programs) {
          dispatch(loadPrograms(data.programs));
        }
        dispatch(loadUserData(uid, data.userData));
      } else {
        onFailure("SERVER ERROR: Unable to get user data from server");
      }
    },
    clearUserData: () => {
      dispatch(clearUserData());
      dispatch(clearPrograms());
    },
    loadFailure: err => {
      dispatch(loadFailure(err));
    },
    screenResize: (width, height) => dispatch(screenResize(width, height)),
  };
};

const Root = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

export default Root;
