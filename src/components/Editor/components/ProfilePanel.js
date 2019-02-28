import React from "react";
import defaultPic from "../../../img/defaultProfile.png";
import firebase from "firebase";
import Filter from "../../../../node_modules/bad-words/lib/badwords.js";
import { MINIMUM_DISPLAY_NAME_LENGTH, MAXIMUM_DISPLAY_NAME_LENGTH } from "../../../constants";

/**--------Props--------
 * handleOnSizeChange: function to be called when the panel is resized
 * handleOnVisibleChange: function to be called when the panel is collapsed or opened
 * panelVisible: boolean to determine if the panel should be open or not
 * size: number? representing the pixel width of the panel
 */

const filter = new Filter();

class ProfilePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prevWidth: 0,
      width: this.props.width,
      isHovering: false,
      editing: false,
      name: "",
      displayNameMessage: "",
    };
  }

  componentDidUpdate() {}

  handleEditClick = () => {
    this.setState(prevState => {
      return { editing: true };
    });
  };

  onChange = e => {
    this.setState({ name: e.target.value });
  };

  checkInputs = () => {
    const name = this.state.name;
    if (name.length < MINIMUM_DISPLAY_NAME_LENGTH || name.length > MAXIMUM_DISPLAY_NAME_LENGTH) {
      this.setState({
        displayNameMessage: `Display name must be between ${MINIMUM_DISPLAY_NAME_LENGTH}-${MAXIMUM_DISPLAY_NAME_LENGTH} characters long`,
      });
      return true;
    } else if (name.match(/[^a-zA-Z0-9!@#$%]/)) {
      this.setState({
        displayNameMessage:
          "Display name must only use upper case and lower case letters, numbers, and/or the special characters !@#$%",
      });
      return true;
    } else if (filter.isProfane(name)) {
      this.setState({ displayNameMessage: "Display name must not contain profanity" });
      return true;
    }
    return false;
  };

  onSubmit = e => {
    e.preventDefault();
    let badInputs = this.checkInputs();

    if (badInputs) {
      this.setState({ name: "", isHovering: true, editing: false });
      return;
    } else {
      this.props.setDisplayName(this.state.name);
      this.setState({ name: "", isHovering: true, editing: false, displayNameMessage: "" });
      return;
    }
  };

  renderErrorMessage = (msg, addBreak) => {
    if (msg)
      return (
        <span>
          <div className="profile-input-error">{msg}</div>
        </span>
      );

    return addBreak ? <br /> : null;
  };

  renderName = () => {
    if (!this.state.editing) {
      return (
        <div
          className="panel-name"
          onMouseEnter={() => this.setState({ isHovering: true })}
          onMouseLeave={() => this.setState({ isHovering: false })}
          onDoubleClick={this.handleEditClick}
        >
          {this.props.displayName || "Joe Bruin"}
          {this.state.isHovering && (
            <button className="edit-icon-image" onClick={this.handleEditClick}>
              <img src="https://i.imgur.com/wQgAOcF.png" width="20px" alt="" />
            </button>
          )}
        </div>
      );
    } else {
      return (
        <form onMouseLeave={this.handleMouseHover} onSubmit={this.onSubmit}>
          <input
            autoFocus
            className="panel-edit"
            placeholder={this.props.displayName}
            onChange={this.onChange}
            onSubmit={this.onSubmit}
            value={this.state.name}
          />
        </form>
      );
    }
  };

  renderProfileButton = disabled => (
    <div className={"panel-options-item" + (disabled ? "-disabled" : "")}>
      {disabled && (
        <img
          style={{ position: "absolute", height: "60px", right: "-2px", zIndex: 20, opacity: 0.9 }}
          alt="banner"
          src="img/longyellow2.png"
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
          src="img/longyellow2.png"
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
        />{" "}
        {/*if there's a photourl, use it, otherwise use the default image (the ?height=500 to make sure the picture sent is resized to 500px tall*/}
        <div>{this.renderName()} </div>
        <div>{this.renderErrorMessage(this.state.displayNameMessage)}</div>
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
