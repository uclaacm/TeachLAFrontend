
export const LOAD_USER_DATA = 'LOAD_USER_DATA'
export function loadUserData(userData, provider=null) {
  return { type: LOAD_USER_DATA, user: userData, provider: provider}
}

export const CLEAR_USER_DATA = 'CLEAR_USER_DATA'
export function clearUserData() {
  return { type: CLEAR_USER_DATA}
}

export const LOAD_FAILURE = 'LOAD_FAILURE'
export function loadFailure(err){
  return { type: LOAD_FAILURE, waiting: false, message: err}
}

export const SET_DISPLAY_NAME = 'SET_DISPLAY_NAME'
export function setDisplayName(displayName){
  return { type: setDisplayName, value: displayName}
}

export const SET_PHOTO_URL = 'SET_DISPLAY_NAME'
export function setPhotoURL(photoURL){
  return { type: setDisplayName, value: photoURL}
}
