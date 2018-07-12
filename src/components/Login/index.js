import React from 'react';
import {RingLoader} from 'react-spinners'
import {Link} from 'react-router-dom'
import SHA256 from 'crypto-js/sha256'
import SocialButton from '../SocialButton'
import '../../styles/Login.css'
import LoginInputs from './components/LoginInputs'

class LoginForm extends React.Component {

	/**
	 * constructor - sets initial state
	 */
	constructor(props){
		super(props)

		this.state = {
			username: "",
			password:"",
		}

		// 'this' context bindings
		this.handleLogin = this.handleLogin.bind(this)
		this.handleSocialLogin = this.handleSocialLogin.bind(this)
		this.changeInput = this.changeInput.bind(this)
	}

	/**
	 * handleLogin - called on user login.  signs the user in and initializes a
	 * pending/waiting state before authentication completes
	 * @param  {HTMLElement} e - default html button whose default behavior is prevented
	 */
	handleLogin(e){
		e.preventDefault() //prevents page from reloading after submitting form
		let emailHash = SHA256(this.state.username).toString() + "@fake.com"
		let passwordHash = SHA256(this.state.password).toString()
		this.props.onLoginRequest(emailHash, passwordHash)
	}

	/**
	 * changeInput - sets the state of whatever input box has been changed
	 * @param  {String} inputType - the purpose of the input box i.e. "username",
	 * "password"
	 * @param  {HTMLElement} e - for retrieving the actual value of the input
	 */
	changeInput(inputType, e){
		this.setState({[inputType]: e.target.value})
	}

	/**
	 * handleSocialLogin - puts login into a pending state while firebase authenticates
	 */
	handleSocialLogin(){
		this.props.onLoginRequest(null, null, this.props.provider)
		// firebase.auth().signInWithPopup(this.props.provider).catch((err) => this.handleLoginFailure(err))
	}

	determineLoginWidth(){
		return Math.max(this.props.width, window.innerWidth, window.screen.width)
	}

	determineLoginHeight(){
		return Math.max(this.props.height, window.innerHeight)
	}

	render(){
		return (
			<div className="login-page" style={{width:this.determineLoginWidth()+"px"}}>
				<div className="login-page-content" style={{paddingBottom:this.determineLoginHeight() < 675 ? 75 + "px" : 0 + "px"}}>
					<div style={{height:"0px"}}>&nbsp;</div>
					{/*for some reason when you don't have a non empty element above the modal, it leaves a white section above it...so thats why this is here*/}
					<div className="login-modal" >
						<LoginInputs onSubmit={(e) => {this.handleLogin(e)}} handleSocialLogin={this.handleSocialLogin} changeInput={(inputType, e) => {this.changeInput(inputType, e)}}
							username={this.state.username} password={this.state.password} waiting={this.props.waiting} message={this.props.message}/>
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
