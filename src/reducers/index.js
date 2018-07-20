import { combineReducers } from 'redux'
import userDataReducers from './userDataReducers'
import userStateReducers from './userStateReducers'
import textEditorReducers from './textEditorReducers'
import outputReducers from './outputReducers'

const appReducers = combineReducers({							//after we get more state, we'll add more reducers here
  userDataReducers,
  userStateReducers,
  textEditorReducers,
  outputReducers
})

export default appReducers
