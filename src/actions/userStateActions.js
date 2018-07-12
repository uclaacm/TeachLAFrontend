import {loadFailure} from './userDataActions'
import firebase from 'firebase'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export function loginRequest(){
  return { type: LOGIN_REQUEST }
}

export const LOGIN_FAILED = 'LOGIN_FAILED'
export function loginFailed(message){
  return { type: LOGIN_FAILED, message: message}
}

export const LOGIN_COMPLETED = 'LOGIN_COMPLETED'
export function loginCompleted(){
  return { type: LOGIN_COMPLETED}
}

/**
 * onLoginRequest - using thunk middleware, I create a thunk that handles login and
 * requests for the redux store to update global application state
 * @param  {String} emailHash    - a SHA256 hashed email
 * @param  {String} passwordHash - a SHA256 hashed password
 * @return {Promise} - a promise that results from the succesful sign in of a user and the
 * dispatching of loginCompleted
 */
export function onLoginRequest(emailHash, passwordHash, loginProvider=null){
  return (dispatch) => {
    if(emailHash && passwordHash){
      dispatch(loginRequest())
      return firebase.auth().signInWithEmailAndPassword(emailHash, passwordHash).then(() => {
        dispatch(loginCompleted())
  	  }).catch(function(err){
        dispatch(loginFailed(err.message))
      })
    }
    else if(loginProvider){
      dispatch(loginRequest())
      return firebase.auth().signInWithPopup(loginProvider).catch(function(err){
        dispatch(loginFailed(err.message))
      })
    }
    else{
      throw "No email and password hash or provider submitted for login request!"
    }
  }
}
