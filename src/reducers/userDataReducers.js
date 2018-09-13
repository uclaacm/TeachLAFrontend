import firebase from 'firebase'

import {
  LOAD_USER_DATA,
  CLEAR_USER_DATA,
  LOAD_FAILURE,
  SET_DISPLAY_NAME,
  SET_PHOTO_URL,
  SET_PROGRAM,
} from '../actions/userDataActions'

const initialState = {
  programs: null,
  error: "",
  displayName: "",
  photoURL: null,
  mostRecentLanguage: "python",
}

//the default parameter is also the initial state of the value. i.e. userDataReducers starts off as ""
function userDataReducers(state = initialState, action) {         //action is a JSON always with the key 'type' and the other keys will depend on what 'type' is
  switch (action.type) {                        //whatever is returned becomes the new state
    case LOAD_USER_DATA:
      return Object.assign({}, state, action.user, {
        programs: firebase.firestore().collection(`users/${action.user.uid}/programs`)
      })
    case CLEAR_USER_DATA:
    	return initialState
    case LOAD_FAILURE:
      state.error = "Failed to load user data..."
      return state
    case SET_DISPLAY_NAME:
      state.displayName = action.value
      return state
    case SET_PHOTO_URL:
      state.photoURL = action.value
      return state
    case SET_MOST_RECENT_LANGUAGE:
      return Object.assign({}, state, {mostRecentLanguage:action.language})
    default:
      return state
  }
}
export default userDataReducers
