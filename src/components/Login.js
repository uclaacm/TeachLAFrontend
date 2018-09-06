import React from 'react';
import SHA256 from 'crypto-js/sha256'
import Footer from './common/Footer'
import '../styles/Login.css'
import LoginInputs from './Login/LoginInputs.js'

class LoginForm extends React.Component {

	/**
	 * constructor - sets initial state
	 */
	constructor(props){
		super(props)

		this.state = {
			username: "",
			password:"",
			width:window.innerWidth,
			height:window.innerHeight,
		}

		// 'this' context bindings
		this.handleLogin = this.handleLogin.bind(this)
		this.handleSocialLogin = this.handleSocialLogin.bind(this)
		this.changeInput = this.changeInput.bind(this)
	}

	componentDidMount(){
		window.addEventListener("resize", this.handleResize, true)
	}

	componentWillUnmount(){
		window.removeEventListener("resize", this.handleResize, true)
	}

	/**
	 * handleResize - called when browser is resized, changes state.width on resize
	 * @param  {Event} e - event fired by resize event listener
	 */
	handleResize = (e) => {
		this.setState({
			width: window.innerWidth,
		})
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

	determineLoginHeight(){
		return Math.max(this.props.height, window.innerHeight)
	}

	getContainerStyle = () => ({
		width:this.state.width,
		margin: "0px",
	})

	getMainContentContainerStyle = () => ({
    height: "100vh",                             /*uses the value set in login-page, inherited the prop*/
    backgroundColor: "#272134",
    backgroundImage: "url('../img/myBg3.png')", /* ABSOLUTE: /src/img/myBg3.png */
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right top",
    backgroundSize: "100% 93%",
    minHeight: "600px",
    overflowY: "auto",
    boxSizing: "border-box",
    paddingBottom: "8vh",
	})

	renderMainContent = () => {
		const loginInputsProps = {
			onSubmit: this.handleLogin,
			handleSocialLogin: this.handleSocialLogin,
			changeInput: this.changeInput,
			username: this.state.username,
			password: this.state.password,
			waiting: this.props.waiting,
			message: this.props.message
		}
		return (
			<div style={this.getMainContentContainerStyle()}>
				<div style={{height:"0px"}}>&nbsp;</div>
				{/*for some reason when you don't have a non empty element above the modal, it leaves a white section above it...so thats why this is here*/}
				<div className="login-modal" >
					<LoginInputs {...loginInputsProps}/>
				</div>
			</div>
		)
	}

	renderFooter = () => (
		<Footer/>
	)

	render(){
		return (
			<div className="login-page" style={this.getContainerStyle()}>
				{this.renderMainContent()}
				{this.renderFooter()}
			</div>
		);
	}

}

export default LoginForm;
