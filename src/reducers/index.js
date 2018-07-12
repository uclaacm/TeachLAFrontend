import { combineReducers } from 'redux'
import userDataReducers from './userDataReducers'
import userStateReducers from './userStateReducers'

const appReducers = combineReducers({							//after we get more state, we'll add more reducers here
  userDataReducers,
  userStateReducers
})

export default appReducers
