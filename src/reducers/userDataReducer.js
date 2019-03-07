import {
  LOAD_USER_DATA,
  CLEAR_USER_DATA,
  LOAD_FAILURE,
  SET_DISPLAY_NAME,
  SET_PHOTO_URL,
  SET_MOST_RECENT_PROGRAM,
} from "../actions/userDataActions";

import { PYTHON, PROCESSING, HTML } from "../constants";

import * as fetch from "../lib/fetch.js";

const initialState = {
  error: "",
  displayName: "",
  photoURL: null,
  uid: "",
  mostRecentProgram: "",
};

function userDataReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_USER_DATA:
      console.log(action.userData.mostRecentProgram);
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
        .updateUserData(state.uid, { displayName: action.value })
        .then(response => {
          //if nothing went bad, keep the display name, otherwise, change it back (or dont, depends how we wanna do it)
          console.log(response);
        })
        .catch(err => {
          state.error = err;
          console.log(err);
        });
      return Object.assign({}, state, { displayName: newName });
    case SET_PHOTO_URL:
      state.photoURL = action.value;
      // fetch.updateUserData(state.uid, {photoURL: action.value})
      //   .then((response)=>{
      //     //if nothing went bad, keep the display name, otherwise, change it back (or dont, depends how we wanna do it)
      //     console.log(response)
      //   })
      //   .catch(err => {
      //     state.error = err
      //     console.log(err)
      //   })
      return state;
    case SET_MOST_RECENT_PROGRAM:
      console.log(action.value);
      fetch
        .updateUserData(state.uid, { mostRecentProgram: action.value })
        .then(response => {
          console.log(action.value);
          console.log(response);
        })
        .catch(err => {
          state.error = err;
          console.log(err);
        });
      return Object.assign({}, state, { mostRecentProgram: action.value });
    default:
      return state;
  }
}
export default userDataReducer;
