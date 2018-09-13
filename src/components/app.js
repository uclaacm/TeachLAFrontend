import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import LoginPage from './containers/LoginContainer';
import EditorPage from './containers/EditorContainer';
import LoadingPage from './common/LoadingPage';
import CreateUserPage from './containers/CreateUserContainer';
import firebase from 'firebase'
import '../styles/app.css'

const provider = new firebase.auth.FacebookAuthProvider();

class App extends React.Component {
	constructor(props){
		super(props)
		// TODO: move checkedAuth into an appropriate reducer. NOTE: checkedAuth is non-UI state.
		this.state={
			checkedAuth:false,
		}
	}

	componentWillMount = () =>{
		firebase.auth().onAuthStateChanged(this.onAuthHandler)
	}

	/**
	 *  TODO: Consider reducing the numerous side effects of this function in favor of the one function, one purpose principle
	 * onAuthHandler - on execution will set a flag checkedAuth to true. If a valid user is passed to the function,
	 * onAuthHandler will attempt to load the metadata and account data corresponding to this account.  If the user
	 * has not set their displayName, it will be set to "New User". If no user is passed, we clear any existng user data from the
	 * application.
	 * @param  {firebase.auth().currentUser}  user - a user object as passed by firebase.auth()
	 */
	onAuthHandler = async (user) => {
		this.setState({checkedAuth:true})
		if (user) {
			let {displayName, email, photoURL, refreshToken, uid} = user

			displayName = displayName || "New User"

			if(email && uid){
				this.props.loadUserData({displayName, email, photoURL, refreshToken, uid})
			} else {
				firebase.auth().signOut()
			}
		} else {
			this.props.clearUserData()
		}
	}

	render() {
		let {loggedInUserData} = this.props
		let {checkedAuth, } = this.state
		//if we haven't checked if the user is logged in yet, show a loading screen
		if(!checkedAuth){
			return (<LoadingPage/>)
    }

    let isValidUser = true
    if(!loggedInUserData || !loggedInUserData.programs) isValidUser = false
    
		return (
				<Router>
		 		 <div className="App">
		 		 	{/*if the user is loggedIn, redirect them to the editor, otherwise, show the login page*?*/}
					<Route exact path="/" render={() => (
							isValidUser ? (
								<Redirect to="/editor"/>
							) : (<LoginPage provider={provider}/>)
						)}
					/>
					{/*if the user is loggedIn, redirect them to the editor, otherwise, show the login page*?*/}
					<Route path="/login" render={() => (
							isValidUser ? (
								<Redirect to="/editor"/>
							) : (<LoginPage provider={provider}/>)
						)}
					/>
					{/*if the user is not loggedIn, redirect them to the login page, otherwise, show the editor page*?*/}
					<Route path="/editor" render={() => (
							!isValidUser ? (
								<Redirect to="/login"/>
							) : (<EditorPage/>)
						)}
					/>
					{/*if the user is loggedIn, redirect them to the editor page, otherwise, show the createUser page*?*/}
					<Route path="/createUser" render={() => (
							isValidUser ? (
								<Redirect to="/editor"/>
							) : (<CreateUserPage/>)
						)}
					/>
				</div>
			</Router>
		);
	}
}

export default App;
