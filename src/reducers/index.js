import { combineReducers } from 'redux'
import loggedIn from './loggedIn'

const appReducers = combineReducers({							//after we get more state, we'll add more reducers here
  loggedIn
})

export default appReducers
