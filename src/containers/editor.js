import React from 'react';
import Editor from '../components/Editor'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {login, logout} from '../actions'
import firebase from 'firebase'
import {withFirestore, firestoreConnect} from 'react-redux-firebase'
import {PROGRAM_PATH} from '../constants'

const mapStateToProps = state => {
  return {
    user: state.app.loggedIn,
    programs: state.firestore.data[PROGRAM_PATH]
  }
}

const mapDispatchToProps = dispatch => {
	return {
		logout: () => {
			firebase.auth().signOut()
			dispatch(logout())
		}
	}
}

const wrappedEditor = connect(
mapStateToProps,
mapDispatchToProps
)

const EditorPage = compose(connect(
  mapStateToProps,
  mapDispatchToProps),
  withFirestore)(Editor)

export default EditorPage
