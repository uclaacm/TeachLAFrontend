import React from "react";
import { RingLoader } from "react-spinners";
import { Link } from "react-router-dom";
import firebase from "firebase";
import SHA256 from "crypto-js/sha256";
import Filter from "bad-words";
import Footer from "./common/Footer.js";
import "../styles/CreateUser.css";
import {
  MINIMUM_USERNAME_LENGTH,
  MINIMUM_PASSWORD_LENGTH,
  MAXIMUM_USERNAME_LENGTH,
  MAXIMUM_PASSWORD_LENGTH,
  EMAIL_DOMAIN_NAME,
} from "../constants";

const filter = new Filter();

/**--------Props--------
 * None
 */

class CreateUser extends React.Component {
  /**
   * constructor - sets initial state and props
   * @param {Object} props - properties passed down by the super component
   */
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errorMessage: "",
      waiting: false,
      message: null,
      usernameMessage: null,
      passwordMessage: null,
    };
  }

  /**
   * checkInputs - validates username and password.
   * The criteria checked:
   *    -Username length: as defined in constants file
   *    -Username characters: only alphanumeric characters, plus !@#$%
   *    -Username profanity: please see bad-words package
   *    -Password length: as defined in constants file
   *    -Password characters: only alphanumeric characters, plus !@#$%
   * @return {boolean} badInputs - indicates whether any of the inputs given do
   * not fall within the criteria above
   */
  checkInputs = () => {
    const { username, password } = this.state;
    let badInputs = false;

    //if username is too long, too short, has non ascii and some special characters, or has profanity in it, reject it
    if (username.length < MINIMUM_USERNAME_LENGTH) {
      this.setState({
        usernameMessage: `Username must be at least ${MINIMUM_USERNAME_LENGTH} characters`,
      });
      badInputs = true;
    } else if (username.length > MAXIMUM_USERNAME_LENGTH) {
      this.setState({
        usernameMessage: `Username must be at most ${MAXIMUM_USERNAME_LENGTH} characters`,
      });
      badInputs = true;
    } else if (username.match(/[^a-zA-Z0-9!@#$%]/)) {
      this.setState({
        usernameMessage:
          "Username must only use upper case and lower case letters, numbers, and/or the special characters !@#$%",
      });
      badInputs = true;
    } else if (filter.isProfane(username)) {
      this.setState({ usernameMessage: "Username must not contain profanity" });
      badInputs = true;
    } else {
      this.setState({ usernameMessage: null });
    }

    //if password is too long, too short, has non ascii and some special characters, reject it
    if (password.length < MINIMUM_PASSWORD_LENGTH) {
      this.setState({
        passwordMessage: `Password must be at least ${MINIMUM_PASSWORD_LENGTH} characters`,
      });
      badInputs = true;
    } else if (password.length > MAXIMUM_PASSWORD_LENGTH) {
      this.setState({
        passwordMessage: `Password must be at most ${MAXIMUM_PASSWORD_LENGTH} characters`,
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
    let badInputs = this.checkInputs();

    //if we found any bad inputs, don't try to create the user on the server
    if (badInputs) {
      return;
    }

    this.setState({ waiting: true, message: null });

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
        this.setState({ waiting: false, errorMessage: error.message || "failed to create user" });
      });

    this.setState({ password: "" });
  };

  renderInputs = () => (
    <div className="create-form-input-list" style={{ width: "460px" }}>
      <div className="create-form-input-header">Username</div>
      <input
        className="create-form-input"
        type="text"
        name="username"
        placeholder=""
        value={this.state.username}
        onChange={e => {
          this.setState({ username: e.target.value });
        }}
      />
      {this.state.usernameMessage ? (
        <div style={{ color: "red", fontSize: "0.8em" }}>{this.state.usernameMessage}</div>
      ) : (
        <br />
      )}
      <div className="create-form-input-header">Password</div>
      <input
        className="create-form-input"
        type="password"
        name="password"
        placeholder=""
        value={this.state.password}
        onChange={e => {
          this.setState({ password: e.target.value });
        }}
      />
      {this.state.passwordMessage ? (
        <div style={{ color: "red", fontSize: "0.8em" }}>{this.state.passwordMessage}</div>
      ) : (
        <br />
      )}
    </div>
  );

  renderHeader = modal => <div style={modal.header}>Create a new account</div>;

  renderButton = () => {
    const buttonStyle = {
      border: "0px",
      borderRadius: "5px",
      fontFamily: "'Josefin Slab', sans-serif",
      fontSize: "1.3rem",
      color: "#dddcdf",
      backgroundColor: "#857e8f",
      height: "40px",
    };

    return (
      <div style={{ alignSelf: "center", margin: "auto", paddingBottom: "10px" }}>
        <button style={buttonStyle} type="submit">
          Create Account
        </button>
      </div>
    );
  };

  renderModal = () => {
    const modal = {
      container: {
        fontFamily: "'Josefin Slab', sans-serif" /*font for the whole create page*/,
        marginTop: "2%" /*modal distance from top of the screen*/,
        marginLeft: "5%" /*modal distance from left side of the screen*/,
        width: "40%",
      },
      form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "15px",
        color: "#dddcdf",
        backgroundColor: "#272134",
      },
      header: { fontSize: "3em", fontWeight: "bold", marginBottom: "10px" },
    };
    return (
      <div className="create-modal" style={modal.container}>
        <form style={modal.form} onSubmit={this.submit}>
          {this.renderHeader(modal)}
          <div
            style={{
              width: "70%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            {this.renderInputs()}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignSelf: "center",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <RingLoader color={"#171124"} size={50} loading={this.state.waiting} />
              {this.state.errorMessage ? (
                <div style={{ color: "red" }}>{this.state.errorMessage}</div>
              ) : (
                <span />
              )}
              {this.renderButton()}
              <Link to="/login" className="create-form-link">
                Already have an account? Click here to log in
              </Link>
            </div>
          </div>
        </form>
      </div>
    );
  };

  renderButton = () => {
    const buttonStyle = {
      border: "0px",
      borderRadius: "5px",
      fontFamily: "'Josefin Slab', sans-serif",
      fontSize: "1.3rem",
      color: "#dddcdf",
      backgroundColor: "#857e8f",
      height: "40px",
      width: "200px",
    };

    return (
      <div style={{ paddingBottom: "10px" }}>
        <button style={buttonStyle} type="submit">
          Create Account
        </button>
      </div>
    );
  };

  render() {
    //if we haven't checked if the user is logged in yet, show a loading screen
    return (
      <div style={{ margin: "0px" }}>
        <div className="create-page-content">{this.renderModal()}</div>
        <Footer />
      </div>
    );
  }
}

export default CreateUser;
