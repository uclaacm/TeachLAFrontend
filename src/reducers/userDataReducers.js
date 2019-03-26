import {
  LOAD_USER_DATA,
  CLEAR_USER_DATA,
  LOAD_FAILURE,
  SET_DISPLAY_NAME,
  SET_MOST_RECENT_PROGRAM,
  SET_PHOTO_NAME,
} from "../actions/userDataActions";

import { PYTHON } from "../constants";

import * as fetch from "../lib/fetch.js";

const initialState = {
  error: "",
  displayName: "",
  uid: "",
  mostRecentProgram: PYTHON,
  photoName: "",
};

function userDataReducers(state = initialState, action) {
  switch (action.type) {
    case LOAD_USER_DATA:
      //pull all values we want to pay attention to out of the object
      return Object.assign({}, state, action.userData);
    case CLEAR_USER_DATA:
      return initialState;
    case LOAD_FAILURE:
      state.error = "Failed to load user data...";
      return state;
    case SET_DISPLAY_NAME:
      let newName = action.value;
      fetch
        .updateUserData(state.uid, { displayName: newName })
        .then(response => {})
        .catch(err => {
          state.error = err;
          console.log(err);
        });
      return Object.assign({}, state, { displayName: newName });
    case SET_MOST_RECENT_PROGRAM:
      return Object.assign({}, state, { mostRecentProgram: action.value });
    case SET_PHOTO_NAME:
      let newPhotoName = action.photoName;
      fetch
        .updateUserData(state.uid, { photoName: newPhotoName })
        .then(response => {
          console.log(action.value);
          console.log(response);
        })
        .catch(err => {
          state.error = err;
          console.log(err);
        });
      return Object.assign({}, state, { photoName: newPhotoName });
    default:
      return state;
  }
}
export default userDataReducers;
