import SHA256 from 'crypto-js/sha256';
import firebase from 'firebase/compat/app';
import React from 'react';
import { Link } from 'react-router-dom';
import { RingLoader } from 'react-spinners';
import { Button } from 'reactstrap';
import 'firebase/compat/auth';
import { EMAIL_DOMAIN_NAME } from '../../constants';
import { isValidUsername, isValidPassword } from '../../lib/validate';
import LoginInput from './LoginInput';

/**
 * Props
 *
 * None
 */

export default class CreateUserForm extends React.Component {
  constructor(props) {
    super(props);
    const { initialState } = props;

    this.state = {
      username: initialState ? initialState.username : '',
      password: initialState ? initialState.password : '',
      confirmPassword: '',
      errorMessage: '',
      waiting: false,
      usernameMessage: '',
      passwordMessage: '',
    };
  }

  /**
   * validateInputs - validates username and password.
   * The criteria checked:
   *    -Username length: as defined in constants file
   *    -Username characters: only alphanumeric characters, plus !@#$%
   *    -Password length: as defined in constants file
   *    -Password characters: only alphanumeric characters, plus !@#$%
   * @return {boolean} - false when bad inputs given
   */
  validateInputs = () => {
    const { username, password, confirmPassword } = this.state;
    let validInputs = true;

    const validUsername = isValidUsername(username);

    if (!validUsername.ok) {
      validInputs = false;
    }

    const validPassword = isValidPassword(password);

    if (!validPassword.ok) {
      validInputs = false;
    }

    this.setState({
      usernameMessage: validUsername.message,
      passwordMessage: validPassword.message,
    });

    if (password !== confirmPassword) {
      this.setState({
        passwordMessage: "Password and Confirm Password don't match",
        password: '',
        confirmPassword: '',
      });
      validInputs = false;
    }

    return validInputs;
  };

  /**
   * submit - this function executes on the click of the button to create a new user on the
   * createUser page
   * @param  {HTMLElement} e - solely used to prevent default page behavior on the clicking
   * of the button
   * @return {void}   submit returns early if the inputs passed by a prospective user
   * are bad.
   */
  submit = (e) => {
    e.preventDefault();

    this.setState({
      waiting: true,
      errorMessage: '',
      usernameMessage: '',
      passwordMessage: '',
    });

    const { username, password } = this.state;

    const validInputs = this.validateInputs();

    // if we found any bad inputs, don't try to create the user on the server
    if (!validInputs) {
      this.setState({ waiting: false });
      return;
    }

    // This is part of the firebase email/password workaround.
    // We create an email lookalike to trick firebase into thinking the user
    // signed up with an email, instead of a username, display name, and password
    const email = username + EMAIL_DOMAIN_NAME;
    const passHash = SHA256(password).toString();

    // register user in firebase
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, passHash)
      .then(() => {})
      .catch((err) => {
        console.error(err);
        let newMsg = err.message;
        switch (err.code) {
        case 'auth/invalid-email':
          newMsg = 'Invalid username. Usernames must only have alphanumeric characters plus !@#$%.';
          break;
        case 'auth/email-already-in-use':
          newMsg = 'Username is taken; please use another one.';
          break;
        case 'auth/user-not-found': // this shouldn't ever happen
          newMsg = 'No account found for username.';
          break;
        case 'auth/wrong-password':
          newMsg = 'Invalid password provided.';
          break;
        case 'auth/network-request-failed':
          newMsg = 'Network error - check your internet connection.';
          break;
        case 'auth/app-deleted':
        case 'auth/app-not-authorized':
        case 'auth/argument-error':
        case 'auth/invalid-api-key':
        case 'auth/operation-not-allowed':
        case 'auth/requires-recent-login':
        case 'auth/unauthorized-domain':
          newMsg = `App was not properly configured. Please contact administrator. Error: ${err.code}`;
          break;
        case 'auth/invalid-user-token':
        case 'auth/user-disabled':
        case 'auth/user-token-expired':
        case 'auth/web-storage-unsupported':
          newMsg = `Issue with user. Please contact administrator. Error: ${err.code}`;
          break;
        default:
          newMsg = `Failed to create user: ${err.code}`;
        }
        this.setState({ waiting: false, errorMessage: newMsg || 'Failed to create user.' });
      });

    this.setState({ password: '', confirmPassword: '' });
  };

  renderErrorMessage = (msg, addBreak) => {
    if (msg) {
      return (
        <span>
          <div className="login-form-input-error">{msg}</div>
        </span>
      );
    }

    return addBreak ? <br /> : null;
  };

  updateUsername = (username) => this.setState({ username });

  updatePassword = (password) => this.setState({ password });

  updateConfirmPassword = (confirmPassword) => this.setState({ confirmPassword });

  renderInputs = () => {
    const {
      username,
      password,
      waiting,
      confirmPassword,
      usernameMessage,
      passwordMessage,
      errorMessage,
    } = this.state;
    return (
      <div className="login-form-input-list">
        <div>
          <LoginInput
            type="Username"
            data={username}
            waiting={waiting}
            onChange={this.updateUsername}
          />
          <LoginInput
            type="Password"
            data={password}
            waiting={waiting}
            onChange={this.updatePassword}
          />
          <LoginInput
            type="Confirm Password"
            data={confirmPassword}
            waiting={waiting}
            onChange={this.updateConfirmPassword}
          />
          {this.renderErrorMessage(usernameMessage)}
          {this.renderErrorMessage(passwordMessage)}
          {this.renderErrorMessage(errorMessage, true)}
        </div>
      </div>
    );
  };

  renderAction = () => {
    const { waiting, hoverButton } = this.state;

    const { themeColor, textColor } = this.props;

    if (waiting) {
      return (
        <div className="login-form-loader">
          <RingLoader color={themeColor} size={80} loading />
        </div>
      );
    }
    const unclickedStyle = {
      backgroundColor: 'white',
      borderColor: themeColor,
      borderWidth: 'medium',
      borderRadius: '4px',
      color: 'black',
    };

    const clickedStyle = {
      backgroundColor: themeColor,
      borderColor: themeColor,
      borderWidth: 'medium',
      borderRadius: '4px',
      color: textColor,
    };
    return (
      <div>
        <Button
          size="lg"
          type="submit"
          style={hoverButton ? clickedStyle : unclickedStyle}
          onMouseEnter={() => this.setState({ hoverButton: !hoverButton })}
          onMouseLeave={() => this.setState({ hoverButton: !hoverButton })}
        >
          Create Account
        </Button>
        <Link to="/login" className="login-form-link ml-4">
          or, login with an existing account
        </Link>
      </div>
    );
  };

  render() {
    return (
      <form className="login-form" onSubmit={this.submit}>
        {this.renderInputs()}
        {this.renderAction()}
      </form>
    );
  }
}
