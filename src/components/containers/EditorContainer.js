import Editor from '../Editor.js'
import {connect} from 'react-redux'
import { clearUserData } from '../../actions/userDataActions.js'
import {switchToProgram} from '../../actions/textEditorActions.js'
import firebase from 'firebase'

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
	return {
	}
}

const EditorPage = connect(
  mapStateToProps,
  mapDispatchToProps)(Editor)

export default EditorPage
