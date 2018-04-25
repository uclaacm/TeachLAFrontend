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
			<div className="login-page">
				{this.props.loggedIn ? <div> Not logged in </div> : <div> Logged in </div>}
				<div className="login-modal">
					<form className='login-form' onSubmit={this.onSubmit}>
					  <div className="login-header">Welcome to Teach LA</div>
					  <br/>
					  <input className="login-form-input" type="text" name="email" placeholder="Username" value={this.state.email} onChange={(e)=>{this.setState({email:e.target.value})}} /><br/>
					  <input className='login-form-input' type="password" name="password" placeholder="Password" value={this.state.password} onChange={(e)=>{this.setState({password:e.target.value})}}/><br/>
					  <button className='login-form-button' type="submit">Log In</button>
					</form>
			    	<div className="login-button-list">
					    <SocialButton
					      provider='google'
					      appId='96680019658-t46qt2n10p06f2nejhb9i7d72fba1n15.apps.googleusercontent.com'
					      onLoginSuccess={this.handleSocialLogin}
					      onLoginFailure={this.handleSocialLoginFailure}
					      onLogoutSuccess={this.test}
					      onLogoutFailure={this.test}
					      imgSrc='img/googleLogo.png'
					      bgColor='#9842f4'
					      textColor='white'
					      textPadding='15px'
					      value='Login with Google'
					    />
		    		</div>
	    		</div>
			</div>
		);
	}
	
}

export default LoginForm;
