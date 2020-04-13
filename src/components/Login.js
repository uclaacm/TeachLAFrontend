import React from "react";
import Footer from "./common/Footer";
import "styles/Login.scss";
import LoginForm from "./Login/LoginForm";
import LoginImg1 from "img/login1.svg";
import LoginBackground1 from "img/background1.svg";

class Login extends React.Component {
  /**
   * constructor - sets initial state
   */
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderMainContent = () => {
    return (
      <div className="login-page-container">
        <div
          className="login-page-content"
          style={{ backgroundImage: `url(${LoginImg1}), url(${LoginBackground1}) ` }}
        >
          <LoginForm provider={this.props.provider} />
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="login-page">
        {this.renderMainContent()}
        <Footer />
      </div>
    );
  }
}

export default Login;
