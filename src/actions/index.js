/*
 * action types
 */

export const LOGIN = 'LOGIN'
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