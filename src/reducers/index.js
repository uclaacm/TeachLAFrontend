import { combineReducers } from 'redux'
import loggedIn from './loggedIn'

const app = combineReducers({
  loggedIn
})

export default app