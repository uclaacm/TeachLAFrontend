import {
  LOGIN,
  LOGOUT
} from '../actions'                             //they're just strings of the same value as the name but just makes it easier to change them later

//the default parameter is also the initial state of the value. i.e. loggedIn starts off as ""
function loggedIn(state = null, action) {         //action is a JSON always with the key 'type' and the other keys will depend on what 'type' is
  switch (action.type) {                        //whatever is returned becomes the new state
    case LOGIN:
      return action.id
    case LOGOUT:
    	return null
    default:
      return state
  }
}
export default loggedIn