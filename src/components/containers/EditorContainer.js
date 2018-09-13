import Editor from '../Editor.js'
import {connect} from 'react-redux'
import { clearUserData } from '../../actions/userDataActions.js'
import {switchToProgram} from '../../actions/textEditorActions.js'
import firebase from 'firebase'

const mapStateToProps = (state) => {
  return {
    user: state.userData,
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
