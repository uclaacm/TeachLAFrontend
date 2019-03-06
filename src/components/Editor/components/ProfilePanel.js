import React from "react";
import defaultPic from "../../../img/defaultProfile.png";
import firebase from "firebase";

/**--------Props--------
 * handleOnSizeChange: function to be called when the panel is resized
 * handleOnVisibleChange: function to be called when the panel is collapsed or opened
 * panelVisible: boolean to determine if the panel should be open or not
 * size: number? representing the pixel width of the panel
 */

class ProfilePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prevWidth: 0,
      width: this.props.width,
    };
  }

  componentDidUpdate() {}

  renderProfileButton = disabled => (
    <div className={"panel-options-item" + (disabled ? "-disabled" : "")}>
      {disabled && (
        <img
          style={{ position: "absolute", height: "60px", right: "-2px", zIndex: 20, opacity: 0.9 }}
          alt="banner"
          src="img/coming-soon-banner.png"
        />
      )}
      <span className={"panel-item-content"}>
        <img className={"panel-item-icon"} alt="house" src="img/house2.png" />
        <span className={"panel-item-name"}>Profile</span>
      </span>
    </div>
  );

  renderSketchesButton = disabled => (
    <div className={"panel-options-item" + (disabled ? "-disabled" : "")}>
      {disabled && (
        <img
          style={{ position: "absolute", height: "60px", right: "-2px", zIndex: 20, opacity: 0.9 }}
          alt="banner"
          src="img/coming-soon-banner.png"
        />
      )}
      <span className="panel-item-content">
        <span className="panel-item-icon">
          <img className="reverse-image" alt="pencil" src="img/pencil.png" />
        </span>
        <span className="panel-item-name">Sketches</span>
      </span>
    </div>
  );

  renderSignOutButton = () => (
    <div className={"panel-options-item"} onClick={() => firebase.auth().signOut()}>
      <span className="panel-item-content">
        <span className="panel-item-icon">
          <img className={"panel-item-icon"} alt="exit" src="img/exit-icon.png" />
        </span>
        <span className="panel-item-name">Log Out</span>
      </span>
    </div>
  );

  renderButtons = () => (
    <div className="panel-options">
      <div className="panel-options-list">
        {this.renderProfileButton(true)}
        {this.renderSketchesButton(true)}
        {this.renderSignOutButton()}
      </div>
    </div>
  );

  renderMainContent = () => (
    <div className="panel">
      <div className="panel-collapse-button">
        <div onClick={this.props.handleOnVisibleChange}>&larr;</div>
        {/*character is leftward facing arrow*/}
      </div>
      <div className="panel-content">
        <img
          className="panel-image"
          src={this.props.photoURL ? this.props.photoURL : defaultPic}
          alt="Your profile"
        />
        <div className="panel-name">{this.props.displayName || "Joe Bruin"}</div>
        {/*if there's no displayName, use the default name "Joe Bruin"*/}
        {this.renderButtons()}
      </div>
      <div className="editor-footer">
        <img className="editor-footer-image" src="img/tla-footer.png" alt="footer" />
      </div>
    </div>
  );

  render() {
    const { panelStyle } = this.props;

    return <div style={panelStyle}>{this.renderMainContent()}</div>;
  }
}

export default ProfilePanel;
