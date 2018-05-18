import React from 'react';
import Editor from '../components/Editor'
import {connect} from 'react-redux'
import {login, logout} from '../actions'
import firebase from 'firebase'
// class LoginPage extends React.Component {
//	 render() {
//		 return(
//			 <div>
//				 <Login></Login>
//			 </div>
//		 )
//	 }
// }

// export default LoginPage;


const mapStateToProps = state => {
  return {
    user: state.loggedIn
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

const EditorPage = connect(
	mapStateToProps,
	mapDispatchToProps
)(Editor)

export default EditorPage