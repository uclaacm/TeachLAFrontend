import React from 'react';
import Login from '../components/Login'
import CSSTransition from 'react-transition-group/CSSTransition'
import '../styles/login.css';

class LoginPage extends React.Component {

  state = {
    loggedIn : false
  }

  render() {
    const { loggedIn } = this.state
    return (
    // Read the doc on your ticket to figure out what's happening here.
    <CSSTransition in={!loggedIn} timeout={300} classNames="login" unmountOnExit>
    <div className="login-container">
        <Login></Login>
        {/* DELETE this button in your final commit as the oauth ticket will make an actual login button.
          This button "exits" the login component. We'll work with them to finalize the animation. */}
        <button onClick={() => {this.setState(state =>({ loggedIn: true}))}}> login </button>
    </div>
    </CSSTransition>
    )
  }
}

export default LoginPage;
