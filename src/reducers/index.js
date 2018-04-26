import { combineReducers } from 'redux'
import loggedIn from './loggedIn'

const app = combineReducers({							//after we get more state, we'll add more reducers hear
  loggedIn
})

export default app