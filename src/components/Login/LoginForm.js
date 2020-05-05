import React from "react";
import SHA256 from "crypto-js/sha256";
import { Button } from "reactstrap";
import { RingLoader } from "react-spinners";
import { EMAIL_DOMAIN_NAME } from "../../constants";
import { Link } from "react-router-dom";
import LoginInput from "./LoginInput";
import * as firebase from "firebase/app";
import "firebase/auth";
import "styles/Login.scss";

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
          console.error(err);
          let newMsg = err.message;
          switch (err.code) {
            case "auth/invalid-email":
              newMsg =
                "Invalid username. Usernames must only have alphanumeric characters plus !@#$%.";
              break;
            case "auth/user-not-found":
              newMsg = "No account found for username.";
              break;
            case "auth/wrong-password":
              newMsg = "Invalid password provided.";
              break;
            case "auth/network-request-failed":
              newMsg = "Network error - check your internet connection.";
              break;
            case "auth/app-deleted":
            case "auth/app-not-authorized":
            case "auth/argument-error":
            case "auth/invalid-api-key":
            case "auth/operation-not-allowed":
            case "auth/requires-recent-login":
            case "auth/unauthorized-domain":
              newMsg =
                "App was not properly configured. Please contact administrator. Error: " + err.code;
              break;
            case "auth/invalid-user-token":
            case "auth/user-disabled":
            case "auth/user-token-expired":
            case "auth/web-storage-unsupported":
              newMsg = "Issue with user. Please contact administrator. Error: " + err.code;
              break;
            default:
              newMsg = "Failed to sign in: " + err.code;
          }
          this.setState({ errorMsg: newMsg, waiting: false });
        });
    } else {
      this.setState({ waiting: false, errorMsg: "Failed to reach Firebase login services" });
    }
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
          type={"Username"}
          data={this.state.username}
          waiting={this.state.waiting}
          onChange={this.updateUsername}
        />
        <LoginInput
          type={"Password"}
          data={this.state.password}
          waiting={this.state.waiting}
          onChange={this.updatePassword}
        />
      </div>
      {this.renderErrorMessage(this.state.errorMsg)}
    </div>
  );

  renderAction = () => {
    if (this.state.waiting) {
      return (
        <div className="login-form-loader">
          <RingLoader color={"#857e8f"} size={50} loading={true} />
        </div>
      );
    } else {
      return (
        <Button className="login-form-button" size="lg" type="submit">
          Login
        </Button>
      );
    }
  };

  render() {
    return (
      <div className="login-form-container">
        <form className="login-form" onSubmit={this.handleEmailLogin}>
          <h1>
            Welcome to <span className="force-no-wrap">&lt;Teach LA&gt;</span>
          </h1>
          <br />
          {this.renderInputs()}
          {this.renderAction()}
          <br />
          <br />
          <Link
            to={{
              pathname: "/createUser",
              state: { username: this.state.username, password: this.state.password },
            }}
            className="login-form-link"
          >
            Don't have an account? Create one now!
          </Link>
          <br />
          <br />
          <details>
            <summary>Forgot your password?</summary>
            <p>
              Send us an email at <a href="mailto:acmteachla@gmail.com">acmteachla@gmail.com</a>{" "}
              with "Forgot Password" in the subject, and we'll do our best to help you out!
            </p>
          </details>
        </form>
      </div>
    );
  }
}
