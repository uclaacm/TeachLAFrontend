import {
  LOGIN,
  LOGOUT
} from '../actions'

console.log(LOGIN)
console.log(LOGOUT)
function loggedIn(state = "", action) {
  switch (action.type) {
    case LOGIN:
      return action.id
    case LOGOUT:
    	return ""
    default:
      return state
  }
}
export default loggedIn