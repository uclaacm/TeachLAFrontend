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


const mapStateToProps = state => ({})	//if they're not loggedIn, they shouldnt be on this page anyways

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