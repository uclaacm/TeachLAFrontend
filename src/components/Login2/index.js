import React from 'react';
import SocialButton from '../SocialButton'
import '../../styles/Login.css'
// import gL1 from '../../img/googleLogo.png'
// import gL2 from '../../img/googleLogoWhiteCircle.png'

const FacebookButton = () => (
	<SocialButton
		provider='facebook'
		appId='273599003179928'
		onLoginSuccess={()=>{console.log("Hey")}}
		onLoginFailure={()=>{console.log("Hey")}}
	>
		Login with facebook
	</SocialButton>
)

class LoginForm extends React.Component {
	
	constructor(props){
		super(props)

		this.state = {
			email: "",
			password:"",
		}
		this.node = null			//node is not in state bc it will cause an infinite amount of updates bc state re-renders the component on change
	}

	/*
	Called after submitting the form
	param:
		e: event sent by the form
	*/
	onSubmit = (e) => {
		e.preventDefault()						//prevents page from reloading after submitting form
		console.log(this.state.email)
		console.log(this.state.password)
		this.setState({							//resetting the email and password to null
			email:"",
			password:""
		})
	}

	/*
		Called after succesful login using SocialButton
		param:
			user:
				object sent by google that has the unique id
	*/
	handleSocialLogin = (user) => {
		// console.log("Login Success")
		this.props.login(user.profile.id)						//logs them into the store using Google's unique id
	}

	/*
		Called after failed login using SocialButton
		param:
			error:
				not very helpful error sent by SocialLogin
	*/
	handleSocialLoginFailure = (error) => {
		// console.log("Login Failure")
		// console.log(error)
		// this.props.logout()				//not sure whether or not we should log them out on Redux if they fail the login
	}

	/*
		Called after succesful logout
	*/
	handleSocialLogoutSuccess = () => {
		// console.log("Logout Success")
		this.props.logout()					//logs them out in the Redux store bc they logged out of the provider
	}

	/*
		Called after failed logout
	*/
	handleSocialLogoutFailure = (test) => {
		// console.log("Logout Failed")		//shouldn't log them out of Redux bc they aren't logged out of the provider
	}

	/*
		Function to call to log the user out of the provider
	*/
	logout = () => {
		if (this.props.loggedIn && this.node) {				//only log them out if they're logged in to the store and we've gotten the ref from the SocialButton
			this.node.node.props.triggerLogout()			//
		} else {
			// console.log("Failed to logout user from provider")
			// console.log(this.props.loggedIn)
			// console.log(this.node)
		}
	}

	render(){

		return (
			<div className="login-page">
				<div className="login-page-content">
					<div style={{height:"0px"}}>&nbsp;</div>			{/*for some reason when you don't have a non empty element above the modal, it leaves a white section above it...so thats why this is here*/}
					<div className="login-modal">
						<form className='login-form' onSubmit={this.onSubmit}>	{/*Form doesn't do anything rn, just an example of a stateful React form.*/}
							<div className="login-header" >{"Welcome to <Teach LA>"}</div>
							<br/>
							<div className="login-form-input-list">
								<div className="login-form-input-header">Email</div>
								<input className="login-form-input" type="text" name="email" placeholder="" value={this.state.email} onChange={(e)=>{this.setState({email:e.target.value})}} /><br/>
								<div className="login-form-input-header">Password</div>
								<input className='login-form-input' type="password" name="password" placeholder="" value={this.state.password} onChange={(e)=>{this.setState({password:e.target.value})}}/><br/>
							</div>
							<button className='login-form-button' type="submit">Login</button>
							<div className="login-button-list">	{/*You can add other buttons underneath this SocialButton and they'll align*/}
								{/*ref prop gives us access to the triggerLogout function. Idk why they didn't just put it in a callback but we gotta work with it. */}
								{/*imgSrc is relative to the public folder if you put a path, hence why theres no img folder in src */}
								{/*textPadding's value is kinda arbitrary, it's kind of a fiddling game*/}
								<SocialButton														
									ref={(node)=>{this.node = node}}						
									provider='google'
									appId='96680019658-t46qt2n10p06f2nejhb9i7d72fba1n15.apps.googleusercontent.com'
									onLoginSuccess={this.handleSocialLogin}
									onLoginFailure={this.handleSocialLoginFailure}
									onLogoutSuccess={this.handleSocialLogoutSuccess}
									onLogoutFailure={this.handleSocialLogoutFailure}
									imgSrc='img/googleLogo.png'
									bgColor='#fc5f5f'
									textColor='white'
									textPadding='15px'
									value='Login with Google'
								/>
							</div>
							<a href="#">Don't have an account? Click here to register and/or login with your Google Account</a>		{/*need to style this*/}
						</form>
					</div>
				</div>
				<div className="login-footer">
					This is the login-footer			{/*probably just going to be a centered image*/}
				</div>
			</div>
		);
	}
	
}

export default LoginForm;
