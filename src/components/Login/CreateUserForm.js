import React from "react";
import { Button } from "reactstrap";
import { RingLoader } from "react-spinners";
import { Link } from "react-router-dom";
import * as firebase from "firebase/app";
import "firebase/auth";
import SHA256 from "crypto-js/sha256";
import LoginInput from "./LoginInput.js";
import {
  MINIMUM_USERNAME_LENGTH,
  MINIMUM_PASSWORD_LENGTH,
  MAXIMUM_USERNAME_LENGTH,
  MAXIMUM_PASSWORD_LENGTH,
  EMAIL_DOMAIN_NAME,
} from "../../constants";

/**
 * Props
 *
 * None
 */

export default class CreateUserForm extends React.Component {
  constructor(props) {
    super(props);

    let init = this.props.initialState;

    this.state = {
      username: init ? init.username : "",
      password: init ? init.password : "",
      confirmPassword: "",
      errorMessage: "",
      waiting: false,
      usernameMessage: "",
      passwordMessage: "",
    };
  }

  /**
   * checkInputs - validates username and password.
   * The criteria checked:
   *    -Username length: as defined in constants file
   *    -Username characters: only alphanumeric characters, plus !@#$%
   *    -Password length: as defined in constants file
   *    -Password characters: only alphanumeric characters, plus !@#$%
   * @return {boolean} - false when bad inputs given
   */
  checkInputs = () => {
    const { username, password, confirmPassword } = this.state;
    let badInputs = true;

    //if username is too long, too short, has non ascii and some special characters, reject it
    if (username.length < MINIMUM_USERNAME_LENGTH || username.length > MAXIMUM_USERNAME_LENGTH) {
      this.setState({
        usernameMessage: `Username must be between ${MINIMUM_USERNAME_LENGTH}-${MAXIMUM_USERNAME_LENGTH} characters long`,
      });
      badInputs = false;
    } else if (username.match(/[^a-zA-Z0-9!@#$%]/)) {
      this.setState({
        usernameMessage:
          "Username must only use upper case and lower case letters, numbers, and/or the special characters !@#$%",
      });
      badInputs = false;
    } else {
      this.setState({ usernameMessage: "" });
    }

    //if password is too long, too short, has non ascii and some special characters, reject it
    if (password.length < MINIMUM_PASSWORD_LENGTH || password.length > MAXIMUM_PASSWORD_LENGTH) {
      this.setState({
        passwordMessage: `Password must be between ${MINIMUM_PASSWORD_LENGTH}-${MAXIMUM_PASSWORD_LENGTH} characters long`,
      });
      badInputs = false;
    } else if (password.match(/[^a-zA-Z0-9!@#$%]/)) {
      this.setState({
        passwordMessage:
          "Password must only use upper case and lower case letters, numbers, and/or the special characters !@#$%",
      });
      badInputs = false;
    } else if (password !== confirmPassword) {
      this.setState({
        passwordMessage: `Password and Confirm Password don't match`,
        password: "",
        confirmPassword: "",
      });
      badInputs = false;
    } else {
      this.setState({ passwordMessage: "" });
    }

    return badInputs;
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
      errorMessage: "",
      usernameMessage: "",
      passwordMessage: "",
    });

    let validInputs = this.checkInputs();

    //if we found any bad inputs, don't try to create the user on the server
    if (!validInputs) {
      this.setState({ waiting: false });
      return;
    }

    // This is part of the firebase email/password workaround.
    // We create an email lookalike to trick firebase into thinking the user
    // signed up with an email, instead of a username, display name, and password
    let email = this.state.username + EMAIL_DOMAIN_NAME;
    let passHash = SHA256(this.state.password).toString();

    // register user in firebase
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, passHash)
      .then(({ user }) => {})
      .catch((err) => {
        console.error(err);
        let newMsg = err.message;
        switch (err.code) {
          case "auth/invalid-email":
            newMsg =
              "Invalid username. Usernames must only have alphanumeric characters plus !@#$%.";
            break;
          case "auth/email-already-in-use":
            newMsg = "Username is taken; please use another one.";
            break;
          case "auth/user-not-found": // this shouldn't ever happen
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
            newMsg = "Failed to create user: " + err.code;
        }
        this.setState({ waiting: false, errorMessage: newMsg || "Failed to create user." });
      });

    this.setState({ password: "", confirmPassword: "" });
  };

  renderErrorMessage = (msg, addBreak) => {
    if (msg)
      return (
        <span>
          <div className="login-form-input-error">{msg}</div>
        </span>
      );

    return addBreak ? <br /> : null;
  };

  updateUsername = (username) => this.setState({ username });
  updatePassword = (password) => this.setState({ password });
  updateConfirmPassword = (confirmPassword) => this.setState({ confirmPassword });

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
        <LoginInput
          type={"Confirm Password"}
          data={this.state.confirmPassword}
          waiting={this.state.waiting}
          onChange={this.updateConfirmPassword}
        />
        {this.renderErrorMessage(this.state.usernameMessage)}
        {this.renderErrorMessage(this.state.passwordMessage)}
        {this.renderErrorMessage(this.state.errorMessage, true)}
      </div>
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
        <div>
          <Button className="login-form-button" size="lg" type="submit">
            Create Account
          </Button>
          <Link to="/login" className="login-form-link ml-4">
            or, login with an existing account
          </Link>
        </div>
      );
    }
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
