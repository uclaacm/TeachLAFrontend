import React from 'react';
import SHA256 from 'crypto-js/sha256'
import {RingLoader} from 'react-spinners'
import {EMAIL_DOMAIN_NAME} from '../../constants'
import {Link} from 'react-router-dom'
import SocialButton from '../common/SocialButton'
import LoginInput from './LoginInput'
import firebase from 'firebase'
import '../../styles/Login.css'

export default class LoginModal extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      username:"",
      password:"",
      errorMsg:"",
      waiting:false,
    }
  }
  
	handleEmailLogin = (e) =>{
    this.setState({waiting:true})
    
		e.preventDefault() //prevents page from reloading after submitting form
		let email = this.state.username + EMAIL_DOMAIN_NAME
    let passwordHash = SHA256(this.state.password).toString()
    
    if(email && passwordHash){
      firebase.auth().signInWithEmailAndPassword(email, passwordHash).then(() => {
      }).catch((err) =>{
        console.log(err)
        this.setState({errorMsg: err.message || "Failed to sign in", waiting:false})
      })
    }
    else{
      this.setState({waiting: false, errorMsg: "Failed to reach Firebase login services"})
    }
  }
  
	handleSocialLogin = (e) =>{
    this.setState({waiting:true})
    firebase.auth().signInWithPopup(this.props.provider).catch(function(err){
      this.setState({errorMsg:"Failed to use Facebook login provider", waiting:false})
    })
  }

  updateUsername = (username) => this.setState({username})
  updatePassword = (password) => this.setState({password})

  render(){
    return (
      <form className='login-form' onSubmit={this.handleEmailLogin}>	{/*Form doesn't do anything rn, just an example of a stateful React form.*/}
        <div className="login-header" >{"Welcome to <Teach LA>"}</div>
        <br/>
        <div className="login-form-input-list">
          <div>
            <LoginInput type={'username'} data={this.state.username} waiting={this.state.waiting} onChange={this.updateUsername}/>
            <LoginInput type={'password'} data={this.state.password} waiting={this.state.waiting} onChange={this.updatePassword}/>
          </div>
          {this.state.errorMsg ? <div style={{color:'red'}}>{this.state.errorMsg}</div> : <span/>}
        </div>
        <div style={{width:"100%", alignItems: "center", flexDirection: "column", justifyContent: "center", display: "flex"}}>
        <RingLoader
          color={'#857e8f'}
          size={50}
          loading={this.state.waiting}
        />
        </div>
        <button className='login-form-button' type="submit">Login</button>
        <div className="login-button-list">
          {/*imgSrc is relative to the public folder if you put a path, hence why theres no img folder in src */}
          {/*textPadding's value is kinda arbitrary, it's kind of a fiddling game*/}
          <SocialButton
            imgSrc='img/fbLogo1.png'
            bgColor='#4267b2'
            textColor='white'
            textPadding='15px'
            value='Login with Facebook'
            handleLogin={this.handleSocialLogin}
          />
        </div>
        <Link to="/createUser" className="login-form-link">Don't have an account? Click here to register and/or login with your Google Account</Link>
      </form>
    )
  }
}
