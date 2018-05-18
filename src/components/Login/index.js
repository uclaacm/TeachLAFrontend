import React from 'react';
import SocialButton from '../SocialButton'
import '../../styles/Login.css'
import firebase from 'firebase'
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
		this.setState({							//resetting the email and password to null
			email:"",
			password:""
		})
	}

	handleLogin = () => {
		// firebase.auth().signInWithRedirect(this.props.provider)
		firebase.auth().signInWithPopup(this.props.provider)
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
									imgSrc='img/fbLogo1.png'
									bgColor='#4267b2'
									textColor='white'
									textPadding='15px'
									value='Login with Facebook'
									handleLogin={this.handleLogin}
								/>
							</div>
							<a href="#" className="login-form-link">Don't have an account? Click here to register and/or login with your Google Account</a>		{/*need to style this*/}
						</form>
					</div>
				</div>
				<div className="login-footer">
					<img className="login-footer-image" src="img/tla-footer.png"/>
				</div>
			</div>
		);
	}
	
}

export default LoginForm;
