import React from "react";
import Footer from "./common/Footer";
import "../styles/Login.css";
import LoginModal from "./Login/LoginModal";
import LoginGuy from "../img/blueguy.png";

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
      <div className="login-page-content" style={{ backgroundImage: `url(${LoginGuy})` }}>
        <div style={{ height: "0px" }}>&nbsp;</div>
        {/*for some reason when you don't have a non empty element above the modal,
        it leaves a white section above it...so thats why this is here*/}
        <div className="login-modal">
          <LoginModal provider={this.props.provider} />
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
