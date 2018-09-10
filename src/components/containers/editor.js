import Editor from '../Editor.js'
import {connect} from 'react-redux'
import {clearUserData, getMostRecentProgram} from '../../actions/userDataActions'
import {switchToProgram} from '../../actions/textEditorActions'
import firebase from 'firebase'

const mapStateToProps = state => {
  let userInfo = state.app.userDataReducers
  return {
    user: userInfo,
  }
}

const mapDispatchToProps = dispatch => {
	return {
		clearUserData: () => {
			firebase.auth().signOut()
			dispatch(clearUserData())
		},
    switchToProgram: (programID, editorID=null) => {
      if(editorID){
        // returns promise
        return dispatch(switchToProgram(programID, editorID))
      }
      else{
        // returns promise
        return dispatch(switchToProgram(programID))
      }
    }
	}
}

const EditorPage = connect(
  mapStateToProps,
  mapDispatchToProps)(Editor)

export default EditorPage
