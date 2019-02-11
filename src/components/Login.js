import React from "react";
import Footer from "./common/Footer";
import "../styles/Login.css";
import LoginModal from "./Login/LoginModal";

/**--------Props--------
 * provider: Facebook Provider used to login with Facebook
 */

class LoginForm extends React.Component {
  /**
   * constructor - sets initial state
   */
  constructor(props) {
    super(props);

    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize, true);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize, true);
  }

  /**
   * handleResize - called when browser is resized, changes state.width on resize
   * @param  {Event} e - event fired by resize event listener
   */
  handleResize = e => {
    this.setState({
      width: window.innerWidth,
    });
  };

  renderMainContent = () => {
    return (
      <div className="login-page-content">
        <div style={{ height: "0px" }}>&nbsp;</div>
        {/*for some reason when you don't have a non empty element above the modal,
        it leaves a white section above it...so thats why this is here*/}
        <div className="login-modal">
          <LoginModal provider={this.props.provider} />
        </div>
      </div>
    );
  };

  renderFooter = () => <Footer />;

  render() {
    return (
      <div className="login-page">
        {this.renderMainContent()}
        {this.renderFooter()}
      </div>
    );
  }
}

export default LoginForm;
