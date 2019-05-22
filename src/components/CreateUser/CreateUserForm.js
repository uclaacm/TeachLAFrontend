import React from "react";
import { RingLoader } from "react-spinners";
import { Link } from "react-router-dom";
import firebase from "firebase";
import SHA256 from "crypto-js/sha256";
import LoginInput from "../Login/LoginInput.js";
import {
  MINIMUM_USERNAME_LENGTH,
  MINIMUM_PASSWORD_LENGTH,
  MAXIMUM_USERNAME_LENGTH,
  MAXIMUM_PASSWORD_LENGTH,
  EMAIL_DOMAIN_NAME,
} from "../../constants";

export default class CreateUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errorMessage: "",
      waiting: false,
      usernameMessage: null,
      passwordMessage: null,
    };
  }

  /**
   * checkInputs - validates username and password.
   * The criteria checked:
   *    -Username length: as defined in constants file
   *    -Username characters: only alphanumeric characters, plus !@#$%
   *    -Password length: as defined in constants file
   *    -Password characters: only alphanumeric characters, plus !@#$%
   * @return {boolean} badInputs - indicates whether any of the inputs given do
   * not fall within the criteria above
   */
  checkInputs = () => {
    const { username, password } = this.state;
    let badInputs = false;

    //if username is too long, too short, has non ascii and some special characters, reject it
    if (username.length < MINIMUM_USERNAME_LENGTH || username.length > MAXIMUM_USERNAME_LENGTH) {
      this.setState({
        usernameMessage: `Username must be between ${MINIMUM_USERNAME_LENGTH}-${MAXIMUM_USERNAME_LENGTH} characters long`,
      });
      badInputs = true;
    } else if (username.match(/[^a-zA-Z0-9!@#$%]/)) {
      this.setState({
        usernameMessage:
          "Username must only use upper case and lower case letters, numbers, and/or the special characters !@#$%",
      });
      badInputs = true;
    } else {
      this.setState({ usernameMessage: null });
    }

    //if password is too long, too short, has non ascii and some special characters, reject it
    if (password.length < MINIMUM_PASSWORD_LENGTH || password.length > MAXIMUM_PASSWORD_LENGTH) {
      this.setState({
        passwordMessage: `Password must be between ${MINIMUM_PASSWORD_LENGTH}-${MAXIMUM_PASSWORD_LENGTH} characters long`,
      });
      badInputs = true;
    } else if (password.match(/[^a-zA-Z0-9!@#$%]/)) {
      this.setState({
        passwordMessage:
          "Password must only use upper case and lower case letters, numbers, and/or the special characters !@#$%",
      });
      badInputs = true;
    } else {
      this.setState({ passwordMessage: null });
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
  submit = e => {
    e.preventDefault();

    this.setState({
      waiting: true,
      errorMessage: "",
      usernameMessage: "",
      passwordMessage: "",
    });

    let badInputs = this.checkInputs();

    //if we found any bad inputs, don't try to create the user on the server
    if (badInputs) {
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
      .catch(error => {
        console.log(error);
        let newErr = error.message || "";
        newErr = newErr.replace("email address", "username");
        this.setState({ waiting: false, errorMessage: newErr || "failed to create user" });
      });

    this.setState({ password: "" });
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

  updateUsername = username => this.setState({ username });
  updatePassword = password => this.setState({ password });

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
        {this.renderErrorMessage(this.state.usernameMessage)}
        {this.renderErrorMessage(this.state.passwordMessage)}
        {this.renderErrorMessage(this.state.errorMessage, true)}
      </div>
    </div>
  );

  renderHeader = () => <div className="login-header">Create a new account</div>;

  renderAction = () => {
    if (this.state.waiting) {
      return (
        <div className="login-form-loader">
          <RingLoader color={"#857e8f"} size={50} loading={true} />
        </div>
      );
    } else {
      return (
        <button className="login-form-button" type="submit">
          Create Account
        </button>
      );
    }
  };

  renderLink = () => (
    <Link to="/login" className="login-form-link">
      Already have an account? Click here to login.
    </Link>
  );

  render() {
    return (
      <div className="login-form-container">
        <form className="login-form" onSubmit={this.submit}>
          {this.renderHeader()}
          <br />
          {this.renderInputs()}
          {this.renderAction()}
          <br />
          <br />
          {this.renderLink()}
        </form>
      </div>
    );
  }
}
