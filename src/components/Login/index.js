import React from 'react';
import SocialButton from '../SocialButton'
import '../../styles/Login.css'
// import gL1 from '../../img/googleLogo.png'
// import gL2 from '../../img/googleLogoWhiteCircle.png'

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
		} //else {
		// 	// console.log("Failed to logout user from provider")
		// 	// console.log(this.props.loggedIn)
		// 	// console.log(this.node)
		// }
	}

	render(){

		return (
			<div className="login-page">
				{this.props.loggedIn ? <button onClick={this.logout}> Logout user {this.props.loggedIn} </button> : <div> Not logged in </div>} {/*Only show the logout button if you're logged in. Not the final location for the button.*/}
				<div className="login-modal">
					<form className='login-form' onSubmit={this.onSubmit}>	{/*Form doesn't do anything rn, just an example of a stateful React form.*/}
					  <div className="login-header">Welcome to Teach LA</div>
					  <br/>
					  <input className="login-form-input" type="text" name="email" placeholder="Username" value={this.state.email} onChange={(e)=>{this.setState({email:e.target.value})}} /><br/>
					  <input className='login-form-input' type="password" name="password" placeholder="Password" value={this.state.password} onChange={(e)=>{this.setState({password:e.target.value})}}/><br/>
					  <button className='login-form-button' type="submit">Log In</button>
					</form>
			    	<div className="login-button-list">
              {/*You can add other buttons underneath this SocialButton and they'll align*/}
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
					      textColor='white'
					      textPadding='15px'
					      value='Login with Google'
					    />
              {/* This is the facebook login button.  Because Facebook does not allow login with facebook in developer mode, the button is currently inoperable.  However, it is linked to the same functionality as the google login*/}
              {/* handleSocialLogin was built to handle google user objects, and not whatever json format facebook uses, so this may break and require modification in the future*/}
              <SocialButton
                provider='facebook'
                appId='273599003179928'
                onLoginSuccess={this.handleSocialLogin}
                onLoginFailure={this.handleSocialLoginFailure}
                imgSrc='img/flogo.png'
              >
              	Login with Facebook
          	  </SocialButton>
		    		</div>
	    		</div>
			</div>
		);
	}

}

export default LoginForm;
