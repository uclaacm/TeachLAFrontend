import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import LoginPage from './login';
import EditorPage from './editor';
import LoadingPage from './loading';
import CreateUserPage from './createUser';
import firebase from 'firebase'
import '../styles/app.css'

const provider = new firebase.auth.FacebookAuthProvider();

class App extends React.Component {
	constructor(props){
		super(props)
		this.state={
			checkedAuth:false,
			width:window.innerWidth,
			height:window.innerHeight,
		}
	}

	componentWillMount = () =>{
		firebase.auth().onAuthStateChanged(this.onAuthHandler)
	}

	onAuthHandler = (user) => {
		this.setState({checkedAuth:true})
		if (user && user.displayName) {
			let {displayName, email, photoURL, refreshToken, uid} = user
			this.props.login({displayName, email, photoURL, refreshToken, uid})
		} else {
			this.props.logout()
		}
	}

	render() {
		let {loggedInUserData} = this.props
		let {checkedAuth, width, height} = this.state
		//if we haven't checked if the user is logged in yet, show a loading screen
		if(!checkedAuth){
			return (<LoadingPage/>)
		}
		return (
				<Router>
		 		 <div className="App">
		 		 	{/*if the user is loggedIn, redirect them to the editor, otherwise, show the login page*?*/}
					<Route exact path="/" render={() => (
							loggedInUserData ? (
								<Redirect to="/editor"/>
							) : (<LoginPage provider={provider} width={width} height={height}/>)
						)}
					/>
					{/*if the user is loggedIn, redirect them to the editor, otherwise, show the login page*?*/}
					<Route path="/login" render={() => (
							loggedInUserData ? (
								<Redirect to="/editor"/>
							) : (<LoginPage provider={provider} width={width} height={height}/>)
						)}
					/>
					{/*if the user is not loggedIn, redirect them to the login page, otherwise, show the editor page*?*/}
					<Route path="/editor" render={() => (
							!loggedInUserData ? (
								<Redirect to="/login"/>
							) : (<EditorPage/>)
						)}
					/>
					{/*if the user is loggedIn, redirect them to the editor page, otherwise, show the createUser page*?*/}
					<Route path="/createUser" render={() => (
							loggedInUserData ? (
								<Redirect to="/editor"/>
							) : (<CreateUserPage/>)
						)}
					/>
					<Route path="/test" component={EditorPage}/>
				</div>
			</Router>
		);
	}
}

export default App;
