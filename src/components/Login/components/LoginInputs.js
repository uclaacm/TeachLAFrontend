import React from 'react';
import {RingLoader} from 'react-spinners'
import {RING_LOADER_SIZE} from '../../../constants'
import {Link} from 'react-router-dom'
import SocialButton from '../../SocialButton'
import LoginInput from './LoginInput'
import '../../../styles/Login.css'

const LoginInputs = (props) => (
  <form className='login-form' onSubmit={props.onSubmit}>	{/*Form doesn't do anything rn, just an example of a stateful React form.*/}
    <div className="login-header" >{"Welcome to <Teach LA>"}</div>
    <br/>
    <div className="login-form-input-list">
      {/* TODO: consider moving arrow function to properly named function to prevent defining function on every re-rendering (e) => {props.changeInput("username", e)}*/ }
      <div>
      <LoginInput type={'username'} data={props.username} waiting={props.waiting} onChange={(e) => {props.changeInput("username", e)}}/>
      <LoginInput type={'password'} data={props.password} waiting={props.waiting} onChange={(e) => {props.changeInput("password", e)}}/>
      </div>
      {props.message ? <div style={{color:'red'}}>{props.message}</div> : <span/>}
    </div>
    <div style={{width:"100%", alignItems: "center", flexDirection: "column", justifyContent: "center", display: "flex"}}>
    <RingLoader
    color={'#857e8f'}
    size={50}
    loading={props.waiting}
    />
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
        handleLogin={props.handleLogin}
      />
    </div>
    <Link to="/createUser" className="login-form-link">Don't have an account? Click here to register and/or login with your Google Account</Link>
  </form>
)

export default LoginInputs
