import { combineReducers } from 'redux'
import userDataReducers from './userDataReducers'
import userStateReducers from './userStateReducers'
import textEditorReducers from './textEditorReducers'
import outputReducers from './outputReducers'
import {reduxFirestore, firestoreReducer} from 'redux-firestore'
import { firebaseReducer, reactReduxFirebase } from 'react-redux-firebase'

const appReducers = combineReducers({							//after we get more state, we'll add more reducers here
  userData: userDataReducers,
  userState: userStateReducers,
  textEditor: textEditorReducers,
  output: outputReducers,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
})

export default appReducers
