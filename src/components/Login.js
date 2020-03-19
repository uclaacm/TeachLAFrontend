import React from "react";
import Footer from "./common/Footer";
import "styles/Login.scss";
import LoginForm from "./Login/LoginForm";
import LoginGuy from "img/blueguy.png";

class Login extends React.Component {
  render() {
    return (
      <div className="login-page">
        <div className="login-page-content" style={{ backgroundImage: `url(${LoginGuy})` }}>
          <LoginForm provider={this.props.provider} />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Login;
