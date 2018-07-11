import { combineReducers } from 'redux'
import userDataReducers from './userDataReducers'

const appReducers = combineReducers({							//after we get more state, we'll add more reducers here
  userDataReducers
})

export default appReducers
