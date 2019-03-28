import React from "react";
import SHA256 from "crypto-js/sha256";
import { RingLoader } from "react-spinners";
import { EMAIL_DOMAIN_NAME } from "../../constants";
import { Link } from "react-router-dom";
//import SocialButton from "../common/SocialButton";
import LoginInput from "./LoginInput";
import firebase from "firebase";
import "../../styles/Login.css";

/**-------Props--------
 * provider: Firebase Provider that allows the app to do Facebook Logins
 */

export default class LoginModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      errorMsg: "",
      waiting: false,
    };
  }

  //===========React Lifecycle Functions============//
  componentDidMount() {}

  handleEmailLogin = e => {
    this.setState({ waiting: true, errorMsg: "" });

    e.preventDefault(); //prevents page from reloading after submitting form
    let email = this.state.username + EMAIL_DOMAIN_NAME;
    let passwordHash = SHA256(this.state.password).toString();

    if (email && passwordHash) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, passwordHash)
        .then(() => {})
        .catch(err => {
          console.log(err);
          let newMsg = err.message;
          switch (err.code) {
            case "auth/user-not-found":
              newMsg = "No account found for username";
              break;
            case "auth/wrong-password":
              newMsg = "Invalid password provided";
              break;
            case "auth/network-request-failed":
              newMsg = "Login request failed. Please try again later...";
              break;
            default:
              newMsg = "Failed to sign in";
          }
          this.setState({ errorMsg: newMsg, waiting: false });
        });
    } else {
      this.setState({ waiting: false, errorMsg: "Failed to reach Firebase login services" });
    }
  };

  handleSocialLogin = e => {
    this.setState({ waiting: true });
    firebase
      .auth()
      .signInWithPopup(this.props.provider)
      .catch(function(err) {
        this.setState({ errorMsg: "Failed to use Facebook login provider", waiting: false });
      });
  };

  updateUsername = username => this.setState({ username });
  updatePassword = password => this.setState({ password });

  renderErrorMessage = (msg, addBreak) => {
    if (msg)
      return (
        <span>
          <div className="login-form-input-error">{msg}</div>
          {addBreak ? <br /> : null}
        </span>
      );

    return <br />;
  };

  renderInputs = () => (
    <div className="login-form-input-list">
      <div>
        <LoginInput
          type={"username"}
          data={this.state.username}
          waiting={this.state.waiting}
          onChange={this.updateUsername}
        />
        <LoginInput
          type={"password"}
          data={this.state.password}
          waiting={this.state.waiting}
          onChange={this.updatePassword}
        />
      </div>
      {this.renderErrorMessage(this.state.errorMsg)}
    </div>
  );

  render() {
    return (
      <form className="login-form" onSubmit={this.handleEmailLogin}>
        {/*Form doesn't do anything rn, just an example of a stateful React form.*/}
        <div className="login-header">{"Welcome to <Teach LA>"}</div>
        <br />
        {this.renderInputs()}
        <div className="login-form-loader">
          <RingLoader color={"#857e8f"} size={50} loading={this.state.waiting} />
        </div>
        <div>
          <button className="login-form-button" type="submit">
            Login
          </button>
          {/*
          <SocialButton
            imgSrc="img/fbLogo1.png"
            bgColor="#4267b2"
            textColor="white"
            value="Login with Facebook"
            handleLogin={this.handleSocialLogin}
          />
          */}
        </div>
        <br />
        <Link to="/createUser" className="login-form-link">
          Don't have an account? Create one now!
        </Link>
      </form>
    );
  }
}
