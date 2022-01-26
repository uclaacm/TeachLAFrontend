import SHA256 from 'crypto-js/sha256';
import firebase from 'firebase/app';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RingLoader } from 'react-spinners';
import { Button } from 'reactstrap';
import { EMAIL_DOMAIN_NAME } from '../../constants';
import LoginInput from './LoginInput';
import 'firebase/auth';
import '../../styles/Login.scss';

export default function LoginModal(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [waiting, setWaiting] = useState(false);
  const [hoverButton, setHoverButton] = useState(false);

  const handleEmailLogin = (e) => {
    setWaiting(true);
    setErrorMsg('');

    e.preventDefault(); // prevents page from reloading after submitting form
    const email = username + EMAIL_DOMAIN_NAME;
    const passwordHash = SHA256(password).toString();

    if (email && passwordHash) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, passwordHash)
        .then(() => {})
        .catch((err) => {
          console.error(err);
          let newMsg = err.message;
          switch (err.code) {
          case 'auth/invalid-email':
            newMsg = 'Invalid username. Usernames must only have alphanumeric characters plus !@#$%.';
            break;
          case 'auth/user-not-found':
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
            newMsg = `Failed to sign in: ${err.code}`;
          }
          setErrorMsg(newMsg);
          setWaiting(false);
        });
    } else {
      setWaiting(false);
      setErrorMsg('Failed to reach Firebase login services');
    }
  };

  const renderErrorMessage = (msg, addBreak) => {
    if (msg) {
      return (
        <span>
          <div className="login-form-input-error">{msg}</div>
          {addBreak ? <br /> : null}
        </span>
      );
    }

    return <br />;
  };

  const renderInputs = () => (
    <div className="login-form-input-list">
      <div>
        <LoginInput type="Username" data={username} waiting={waiting} onChange={setUsername} />
        <LoginInput type="Password" data={password} waiting={waiting} onChange={setPassword} />
      </div>
      {renderErrorMessage(errorMsg)}
    </div>
  );

  const renderAction = () => {
    const { themeColor, textColor } = props;
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

    if (waiting) {
      return (
        <div className="login-form-loader">
          <RingLoader color={themeColor} size={80} loading />
        </div>
      );
    }
    return (
      <div>
        <Button
          size="lg"
          type="submit"
          style={hoverButton ? clickedStyle : unclickedStyle}
          onMouseEnter={() => setHoverButton(!hoverButton)}
          onMouseLeave={() => setHoverButton(!hoverButton)}
        >
          Login
        </Button>
        <Link
          to={{
            pathname: '/createUser',
            state: { username, password },
          }}
          className="login-form-link ml-4"
        >
          {' '}
          or, create an account
        </Link>
      </div>
    );
  };

  return (
    <div>
      <form className="login-form" onSubmit={handleEmailLogin}>
        {renderInputs()}
        {renderAction()}
        {!waiting && (
          <details className="mt-2">
            <summary>Forgot your password?</summary>
            <p>
              Send us an email at
              {' '}
              <a href="mailto:acmteachla@gmail.com">acmteachla@gmail.com</a>
              {' '}
              with &quot;Forgot Password&quot; in the subject, and we&apos;ll do our best to help
              you out!
            </p>
          </details>
        )}
      </form>
    </div>
  );
}
