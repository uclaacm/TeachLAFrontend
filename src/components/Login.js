import React from "react";
import Footer from "./common/Footer";
import "../styles/Login.css";
import LoginForm from "./Login/LoginForm";

/**--------Props--------
 * provider: Facebook Provider used to login with Facebook
 */

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
      <div className="login-page-content">
        <LoginForm provider={this.props.provider} />
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
