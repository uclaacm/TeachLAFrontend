import firebase from 'firebase'

import {
  LOAD_USER_DATA,
  CLEAR_USER_DATA,
  LOAD_FAILURE,
  SET_DISPLAY_NAME,
  SET_PHOTO_URL,
  SET_PROGRAM,
} from '../actions/userDataActions'

//the default parameter is also the initial state of the value. i.e. userDataReducers starts off as ""
function userDataReducers(state = null, action) {         //action is a JSON always with the key 'type' and the other keys will depend on what 'type' is
  switch (action.type) {                        //whatever is returned becomes the new state
    case LOAD_USER_DATA:
      return Object.assign({}, state, action.user, {
        programs: firebase.firestore().collection(`users/${action.user.uid}/programs`)
      })
    case CLEAR_USER_DATA:
    	return null
    case LOAD_FAILURE:
      return null
    case SET_DISPLAY_NAME:
      if(state === null){
        return state
      }
      state.displayName = action.value
      return state
    case SET_PHOTO_URL:
      if(state === null){
        return state
      }
      state.photoURL = action.value
      return state
    default:
      return state
  }
}
export default userDataReducers
