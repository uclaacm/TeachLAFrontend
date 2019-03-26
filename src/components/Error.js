import React from "react";
import Footer from "./common/Footer";
import "../styles/app.css";

class Error extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderError = () => {
    return (
      <div className="login-page-content">
        <div className="login-modal">
          <div className="login-form">
            <div className="login-header">{"Oops!"}</div>
            <br />
            <h1>Something went wrong. Try again later!</h1>
            <br />
            <h1>{this.props.errorMsg}</h1>
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
