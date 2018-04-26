/*
 * action types
 */

export const LOGIN = 'LOGIN'			//just a way to make it easier to change the type of an action
export const LOGOUT = 'LOGOUT'

/*
 * other constants
 */

/*
 * action creators
 */

export function login(id) {	
  return { type: LOGIN, id: id}
}

export function logout() {
  return { type: LOGOUT}
}