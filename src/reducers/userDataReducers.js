import firebase from 'firebase'

import {
  LOAD_USER_DATA,
  CLEAR_USER_DATA,
  LOAD_FAILURE,
  SET_DISPLAY_NAME,
  SET_PHOTO_URL,
  SET_PROGRAM,
} from '../actions/userDataActions'

import * as fetch from '../lib/fetch.js'

const initialState = {
  programs: null,
  error: "",
  displayName: "",
  photoURL: null,
  uid:"",
}

//the default parameter is also the initial state of the value. i.e. userDataReducers starts off as ""
function userDataReducers(state = initialState, action) {         //action is a JSON always with the key 'type' and the other keys will depend on what 'type' is
  switch (action.type) {                        //whatever is returned becomes the new state
    case LOAD_USER_DATA:
      return Object.assign({}, state, action.value)
    case CLEAR_USER_DATA:
    	return initialState
    case LOAD_FAILURE:
      state.error = "Failed to load user data..."
      return state
    case SET_DISPLAY_NAME:
      state.displayName = action.value
      fetch.updateUserData(state.uid, {displayName: action.value})
        .then((response)=>{
          //if nothing went bad, keep the display name, otherwise, change it back (or dont, depends how we wanna do it)
          console.log(response)
        })
        .catch(err => {
          state.error = err
          console.log(err)
        })
      return state
    case SET_PHOTO_URL:
      state.photoURL = action.value
      fetch.updateUserData(state.uid, {photoURL: action.value})
        .then((response)=>{
          //if nothing went bad, keep the display name, otherwise, change it back (or dont, depends how we wanna do it)
          console.log(response)
        })
        .catch(err => {
          state.error = err
          console.log(err)
        })
      return state
    default:
      return state
  }
}
export default userDataReducers
