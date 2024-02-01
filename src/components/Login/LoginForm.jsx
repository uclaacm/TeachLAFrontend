import SHA256 from 'crypto-js/sha256';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RingLoader } from 'react-spinners';
import { Button } from 'reactstrap';

import { EMAIL_DOMAIN_NAME } from '../../constants';
import {
  signInWithEmailAndPassword,
  signInAnonymously,
  getCreateUserErrorMessage,
} from '../../firebase';
import LoginInput from './LoginInput';
import '../../styles/Login.scss';

export default function LoginModal(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [waiting, setWaiting] = useState(false);
  const [hoverButton, setHoverButton] = useState(false);

  const handleAnonymousLogin = (e) => {
    setWaiting(true);
    setErrorMsg('');

    e.preventDefault();
    signInAnonymously()
      .then(() => {})
      .catch((err) => {
        console.error(err);
        setErrorMsg(getCreateUserErrorMessage(err));
        setWaiting(false);
      });
  };

  const handleEmailLogin = (e) => {
    setWaiting(true);
    setErrorMsg('');

    e.preventDefault(); // prevents page from reloading after submitting form
    const email = username + EMAIL_DOMAIN_NAME;
    const passwordHash = SHA256(password).toString();

    if (email && passwordHash) {
      signInWithEmailAndPassword(email, passwordHash)
        .then(() => {})
        .catch((err) => {
          console.error(err);
          setErrorMsg(getCreateUserErrorMessage(err));
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

    return null;
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
    const clickedStyle = {
      backgroundColor: 'white',
      borderColor: themeColor,
      color: 'black',
    };

    const unclickedStyle = {
      backgroundColor: themeColor,
      borderColor: themeColor,
      color: textColor,
    };

    const subButtonStyle = {
      color: 'var(--bs-blue)',
    };

    if (waiting) {
      return (
        <div className="login-form-loader">
          <RingLoader color={themeColor} size={80} loading />
        </div>
      );
    }
    return (
      <div className="mt-2">
        <Button
          size="lg"
          type="submit"
          className="login-main-button"
          style={hoverButton ? clickedStyle : unclickedStyle}
          onMouseEnter={() => setHoverButton(!hoverButton)}
          onMouseLeave={() => setHoverButton(!hoverButton)}
        >
          Login
        </Button>
        <div className="login-sub-options">
          <hr className="mt-4 mb-3" />
          <p
            style={{ color: '#595959', textAlign: 'center', width: '100%' }}
            className="mb-4 w-100"
          >
            Don&apos;t have an account?
            <br />
            <Link
              to={{
                pathname: '/createUser',
                state: { username, password },
              }}
              className="login-form-link"
              style={subButtonStyle}
            >
              Sign up
            </Link>
            {' or '}
            <Button
              onClick={handleAnonymousLogin}
              className="login-guest-button"
              style={subButtonStyle}
            >
              continue as guest
            </Button>
          </p>
        </div>
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
      </div>
    );
  };

  return (
    <div>
      <form className="login-form" onSubmit={handleEmailLogin}>
        {renderInputs()}
        {renderAction()}
      </form>
    </div>
  );
}
