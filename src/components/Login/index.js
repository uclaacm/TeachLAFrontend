import React from 'react';
import {RingLoader} from 'react-spinners'
import {Link} from 'react-router-dom'
import SHA256 from 'crypto-js/sha256'
import SocialButton from '../SocialButton'
import '../../styles/Login.css'
import firebase from 'firebase'
import {loginFailure} from '../../actions'
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
			curWidth:0,
			curHeight:0,
			waiting: false,
			message: null,
		}
	}

	/**
	 * codeToErrorMessage - maps a firebase authentication error to a more human
	 * readable form
	 * @param  {String} code - authentication code returned by firebase
	 */
	codeToErrorMessage = (code) => {
		switch(code){
			case "auth/user-not-found":
				return "Username not found. Please check spelling"
			case "auth/wrong-password":
				return "Incorrect password. Please try again"
			case "auth/too-many-requests":
				return "Too many login attempts. Wait a few seconds before next login attempt"
			default:
				return "Incorrect username password combination. Please try again"
		}
	}

  updateDimensions = () => {
      this.setState({curWidth:window.innerWidth, curHeight:window.innerHeight});
  }

  componentWillMount(){
      this.updateDimensions();
  }

  componentDidMount(){
      window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount(){
      window.removeEventListener("resize", this.updateDimensions);
  }

	/*
	Called after submitting the form
	param:
		e: event sent by the form
	*/

	handleLoginFailure = (err) => {
		loginFailure(this.codeToErrorMessage(err.code))
		this.setState({waiting:false, message:this.codeToErrorMessage(err.code)})
	}

	handleLogin = (e) =>{
		e.preventDefault()						//prevents page from reloading after submitting form
		firebase.auth().signInWithEmailAndPassword(SHA256(this.state.username).toString() + "@fake.com", SHA256(this.state.password).toString())
			.catch(this.handleLoginFailure)
		this.setState({
			waiting:true,
		})
	}

	/**
	 * changeInput - sets the state of whatever input box has been changed
	 * @param  {String} inputType - the purpose of the input box i.e. "username",
	 * "password"
	 * @param  {HTMLElement} e - for retrieving the actual value of the input
	 */
	changeInput = (inputType, e) => {
		this.setState({[inputType]: e.target.value})
	}

	/**
	 * handleSocialLogin - puts login into a pending state while firebase authenticates
	 */
	handleSocialLogin = () => {
		this.setState({waiting:true})
		firebase.auth().signInWithPopup(this.props.provider).catch((err) => this.handleLoginFailure(err))
	}

	render(){
		const {width, height} = this.props
		const {curWidth, curHeight, waiting, message} = this.state

		let finalWidth = Math.max(width, curWidth, window.screen.width)
		let finalHeight = Math.max(height, curHeight)

		return (
			<div className="login-page" style={{width:finalWidth+"px"}}>
				<div className="login-page-content" style={{paddingBottom:curHeight < 675 ? 75 + "px" : 0 + "px"}}>
					<div style={{height:"0px"}}>&nbsp;</div>
					{/*for some reason when you don't have a non empty element above the modal, it leaves a white section above it...so thats why this is here*/}
					<div className="login-modal" >
						<LoginInputs onSubmit={(e) => {this.handleLogin(e)}} handleLogin={this.handleSocialLogin} changeInput={(inputType, e) => {this.changeInput(inputType, e)}}
							username={this.state.username} password={this.state.password} waiting={waiting} message={message}/>
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
