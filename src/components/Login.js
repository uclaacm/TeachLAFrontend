import React from "react";
import Footer from "./common/Footer";
import "../styles/Login.css";
import LoginModal from "./Login/LoginModal";

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
        <div style={{ height: "0px" }}>&nbsp;</div>
        {/*for some reason when you don't have a non empty element above the modal,
        it leaves a white section above it...so thats why this is here*/}
        <div className="row">
          <div className="col">
            <div className="login-modal">
              <LoginModal provider={this.props.provider} />
            </div>
          </div>
          <div className="col hidden-small" />
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
