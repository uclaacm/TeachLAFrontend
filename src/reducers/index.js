import { combineReducers } from 'redux'
import userDataReducers from './userDataReducers'
import programsReducers from './programsReducers'
import outputReducers from './outputReducers'

const appReducers = combineReducers({							//after we get more state, we'll add more reducers here
  userData: userDataReducers,
  output: outputReducers,
  programs: programsReducers,
})

export default appReducers
