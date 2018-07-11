import Editor from '../components/Editor'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {clearUserData,} from '../actions/userDataActions'
import firebase from 'firebase'
import {withFirestore} from 'react-redux-firebase'
import {PROGRAM_PATH} from '../constants'

const mapStateToProps = state => {
  return {
    user: state.app.userDataReducers,
    programs: state.firestore.data[PROGRAM_PATH]
  }
}

const mapDispatchToProps = dispatch => {
	return {
		clearUserData: () => {
			firebase.auth().signOut()
			dispatch(clearUserData())
		}
	}
}

const EditorPage = compose(connect(
  mapStateToProps,
  mapDispatchToProps),
  withFirestore)(Editor)

export default EditorPage
