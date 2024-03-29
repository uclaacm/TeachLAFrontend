import {
  LOAD_USER_DATA,
  CLEAR_USER_DATA,
  LOAD_FAILURE,
  SET_DISPLAY_NAME,
  SET_MOST_RECENT_PROGRAM,
  SET_PHOTO_NAME,
  SET_CURRENT_CLASS,
} from '../actions/userDataActions';

const initialState = {
  error: '',
  displayName: '',
  uid: '',
  mostRecentProgram: '',
  photoName: '',
  currentClass: '',
};

// eslint-disable-next-line default-param-last
function userDataReducer(state = initialState, action) {
  switch (action.type) {
  case LOAD_USER_DATA:
    // pull all values we want to pay attention to out of the object
    return { ...state, ...action.userData };
  case CLEAR_USER_DATA:
    return initialState;
  case LOAD_FAILURE:
    return { ...state, error: action.message };
  case SET_DISPLAY_NAME:
    return { ...state, displayName: action.value };
  case SET_PHOTO_NAME:
    return { ...state, photoName: action.photoName };
  case SET_MOST_RECENT_PROGRAM:
    return { ...state, mostRecentProgram: action.value };
  case SET_CURRENT_CLASS:
    return { ...state, currentClass: action.value };
  default:
    return state;
  }
}
export default userDataReducer;
