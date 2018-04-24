import React from 'react';
import SocialButton from '../SocialButton'

class LoginForm extends React.Component {
	
	constructor(props){
		super(props)

		this.state = {
			email: "",
			password:"",
		}
	}

	onSubmit = (e) => {
		e.preventDefault()
		console.log(this.state.email)
		console.log(this.state.password)
		this.setState({
			email:"",
			password:""
		})
	}

	handleSocialLogin = (user) => {
		this.props.login(user.profile.id)
	}

	handleSocialLoginFailure = (user) => {
		console.log(user)
		this.props.logout()
	}

	test = (user) => {
		console.log(user)
	}
	render(){

		return (
			<div className="page">
				{this.props.loggedIn ? <div> Not logged in </div> : <div> Logged in </div>}
				<h1>The Coding School</h1>
				<form onSubmit={this.onSubmit}>
				  Form doesn't do anything, just an example of stateful form<br/>
				  <input type="text" name="email" placeholder="Email" onChange={(e)=>{this.setState({email:e.target.value})}} /><br/>
				  <input type="password" name="password" placeholder="Password" onChange={(e)=>{this.setState({password:e.target.value})}}/><br/>
				  <button type="submit">Submit</button>
				</form>
			    <SocialButton
			      provider='facebook'
			      appId='273599003179928'
			      onLoginSuccess={this.handleSocialLogin}
			      onLoginFailure={this.handleSocialLoginFailure}
			    >
			    	Login with facebook
		    	</SocialButton>
			    <SocialButton
			      provider='google'
			      appId='96680019658-t46qt2n10p06f2nejhb9i7d72fba1n15.apps.googleusercontent.com'
			      onLoginSuccess={this.handleSocialLogin}
			      onLoginFailure={this.handleSocialLoginFailure}
			      onLogoutSuccess={this.test}
			      onLogoutFailure={this.test}
			    >
			    	Login with google
		    	</SocialButton>
			</div>
		);
	}
	
}

export default LoginForm;
