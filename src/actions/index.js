/*
 * action types - just a way to make it easier to change the type of an action
 */

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

/*
 * other constants
 */

/*
 * action creators
 */

export function login(user, provider=null) {
  return { type: LOGIN, user: user, provider: provider}
}

export function logout() {
  return { type: LOGOUT}
}

export function loginFailure(err){
  return { type: LOGIN_FAILURE, waiting: false, message: err}
}
