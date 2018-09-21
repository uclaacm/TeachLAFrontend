import React from 'react';
import Footer from './common/Footer'
import '../styles/Login.css'
import LoginModal from './Login/LoginModal'

class LoginForm extends React.Component {

	/**
	 * constructor - sets initial state
	 */
	constructor(props){
		super(props)

		this.state = {
			width:window.innerWidth,
      height:window.innerHeight,
		}

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

	getContainerStyle = () => ({
		width:this.state.width,
		margin: "0px",
	})

	getMainContentContainerStyle = () => ({
    height: "100vh",                             
    backgroundColor: "#272134",
    backgroundImage: "url('../img/blueguy-transparent-2.png')", /* ABSOLUTE: /src/img/myBg3.png */
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right top",
    backgroundSize: "auto 93%",
    minHeight: "600px",
    overflowY: "auto",
    boxSizing: "border-box",
    paddingBottom: "8vh",
  })
  
	renderMainContent = () => {
		return (
			<div style={this.getMainContentContainerStyle()}>
				<div style={{height:"0px"}}>&nbsp;</div>
				{/*for some reason when you don't have a non empty element above the modal, it leaves a white section above it...so thats why this is here*/}
				<div className="login-modal" >
					<LoginModal provider={this.props.provider}/>
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
