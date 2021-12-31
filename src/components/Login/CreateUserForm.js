import SHA256 from 'crypto-js/sha256';
import firebase from 'firebase/app';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RingLoader } from 'react-spinners';
import { Button } from 'reactstrap';
import 'firebase/auth';
import { EMAIL_DOMAIN_NAME } from '../../constants';
import { isValidUsername, isValidPassword } from '../../lib/validate';
import LoginInput from './LoginInput';

/**
 * Props
 *
 * None
 */

export default function CreateUserForm(props) {
  // const init = props.initialState;
  const { initialState } = props;
  const [username, setusername] = useState(initialState ? initialState.username : '');
  const [password, setpassword] = useState(initialState ? initialState.password : '');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [errorMessage, seterrorMessage] = useState('');
  const [waiting, setwaiting] = useState(false);
  const [usernameMessage, setusernameMessage] = useState('');
  const [passwordMessage, setpasswordMessage] = useState('');

  /**
   * validateInputs - validates username and password.
   * The criteria checked:
   *    -Username length: as defined in constants file
   *    -Username characters: only alphanumeric characters, plus !@#$%
   *    -Password length: as defined in constants file
   *    -Password characters: only alphanumeric characters, plus !@#$%
   * @return {boolean} - false when bad inputs given
   */
  const validateInputs = () => {
    // const { username, password, confirmPassword } = state;
    const username1 = username;
    const password1 = password;
    const confirmPassword1 = confirmPassword;
    let validInputs = true;

    const validUsername = isValidUsername(username1);

    if (!validUsername.ok) {
      validInputs = false;
    }

    const validPassword = isValidPassword(password1);

    if (!validPassword.ok) {
      validInputs = false;
    }

    setusername(validUsername.message);
    setpassword(validPassword.message);

    if (password !== confirmPassword1) {
      setpasswordMessage("Password and Confirm Password don't match");
      setpassword('');
      setconfirmPassword('');
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
  const submit = (e) => {
    e.preventDefault();

    setwaiting(true);
    seterrorMessage('');
    setusernameMessage('');
    setpasswordMessage('');

    const validInputs = validateInputs();

    // if we found any bad inputs, don't try to create the user on the server
    if (!validInputs) {
      setwaiting(false);
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
        setwaiting(false);
        seterrorMessage(newMsg || 'Failed to create user.');
      });
    setpassword('');
    setconfirmPassword('');
  };

  const renderErrorMessage = (msg, addBreak) => {
    if (msg) {
      return (
        <span>
          <div className="login-form-input-error">{msg}</div>
        </span>
      );
    }

    return addBreak ? <br /> : null;
  };

  const updateUsername = (newusername) => setusername(newusername);

  const updatePassword = (newpassword) => setpassword(newpassword);

  const updateConfirmPassword = (newconfirmPassword) => setconfirmPassword(newconfirmPassword);

  const renderInputs = () => (
    <div className="login-form-input-list">
      <div>
        <LoginInput type="Username" data={username} waiting={waiting} onChange={updateUsername} />
        <LoginInput type="Password" data={password} waiting={waiting} onChange={updatePassword} />
        <LoginInput
          type="Confirm Password"
          data={confirmPassword}
          waiting={waiting}
          onChange={updateConfirmPassword}
        />
        {renderErrorMessage(usernameMessage)}
        {renderErrorMessage(passwordMessage)}
        {renderErrorMessage(errorMessage, true)}
      </div>
    </div>
  );

  const renderAction = () => {
    const { themeColor, textColor } = props;
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

    const [hoverButton, sethoverButton] = useState();
    return (
      <div>
        <Button
          size="lg"
          type="submit"
          style={hoverButton ? clickedStyle : unclickedStyle}
          onMouseEnter={() => sethoverButton(!hoverButton)}
          onMouseLeave={() => sethoverButton(!hoverButton)}
        >
          Create Account
        </Button>
        <Link to="/login" className="login-form-link ml-4">
          or, login with an existing account
        </Link>
      </div>
    );
  };

  return (
    <form className="login-form" onSubmit={submit}>
      {renderInputs()}
      {renderAction()}
    </form>
  );
}
