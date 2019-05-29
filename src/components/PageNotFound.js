import React from "react";
import Footer from "./common/Footer";
import { Link } from "react-router-dom";
import "../styles/app.css";
import LoginGuy from "img/blueguy.png";

class Error extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderError = () => {
    return (
      <div className="login-page-content" style={{ backgroundImage: `url(${LoginGuy})` }}>
        <div className="login-modal">
          <div className="login-form">
            <br />
            <div className="login-header">{"Page not found!"}</div>
            <br />
            <Link to="/">
              <button className="login-form-button">Back to safety</button>
            </Link>
          </div>
        </div>
      </div>
    );
  };

  renderFooter = () => {
    return <Footer />;
  };

  render() {
    return (
      <div className="login-page">
        {this.renderError()}
        {this.renderFooter()}
      </div>
    );
  }
}
export default Error;
