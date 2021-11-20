import {
  LOAD_USER_DATA,
  CLEAR_USER_DATA,
  LOAD_FAILURE,
  SET_DISPLAY_NAME,
  SET_MOST_RECENT_PROGRAM,
  SET_PHOTO_NAME,
  SET_CURRENT_CLASS,
} from '../actions/userDataActions';

import * as fetch from '../lib/fetch.js';

const initialState = {
  error: '',
  displayName: '',
  uid: '',
  mostRecentProgram: '',
  photoName: '',
  currentClass: '',
};

function userDataReducer(state = initialState, action) {
  switch (action.type) {
  case LOAD_USER_DATA:
    // pull all values we want to pay attention to out of the object
    return { ...state, ...action.userData };
  case CLEAR_USER_DATA:
    return initialState;
  case LOAD_FAILURE:
    return { ...state, error: action.message };
  case SET_DISPLAY_NAME: {
    const newName = action.value;
    fetch
      .updateUserData(state.uid, { displayName: newName })
      .catch((err) => {
        state.error = err;
        console.log(err);
      });
    return { ...state, displayName: newName };
  }
  case SET_PHOTO_NAME: {
    const newPhotoName = action.photoName;
    fetch
      .updateUserData(state.uid, { photoName: newPhotoName })
      .then(() => {
        // TODO: if nothing went bad, keep the display name,
        // otherwise, change it back (or dont, depends how we wanna do it)
      })
      .catch((err) => {
        state.error = err;
        console.log(err);
      });
    return { ...state, photoName: newPhotoName };
  }
  case SET_MOST_RECENT_PROGRAM:
    fetch
      .updateUserData(state.uid, { mostRecentProgram: action.value })
      .catch((err) => {
        state.error = err;
        console.log(err);
      });
    return { ...state, mostRecentProgram: action.value };
  case SET_CURRENT_CLASS:
    return { ...state, currentClass: action.value };
  default:
    return state;
  }
}
export default userDataReducer;
