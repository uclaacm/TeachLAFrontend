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
      <div className="Loading">
        <div className="Loading-title">Uh oh!</div>
        <h2>{this.props.errorMsg}</h2>
      </div>
    );
  };

  renderFooter = () => {
    return <Footer />;
  };

  render() {
    return (
      <div>
        {this.renderError()}
        {this.renderFooter()}
      </div>
    );
  }
}
export default Error;
