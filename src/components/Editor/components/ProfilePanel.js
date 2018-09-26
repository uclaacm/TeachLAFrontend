import React from "react";
import Dock from "react-dock";
import defaultPic from "../../../img/defaultProfile.png";
import EditDisplayNameInput from "./EditDisplayNameInput.js";
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
      displayNameHovered: false,
      profilePictureHovered: false,
      editingDisplayName: false,
    };
  }

  renderCollapseButton = () => (
    <div className="panel-collapse-button">
      <div />
      <div onClick={this.props.handleOnVisibleChange}>&larr;</div>
    </div>
  );

  renderProfilePictureEditPencil = () => {
    if (!this.state.profilePictureHovered) {
      return null;
    }

    return (
      <img
        style={{ position: "absolute", right: "40px", bottom: "10px" }}
        width="20px"
        src="https://image.flaticon.com/icons/svg/61/61456.svg"
      />
    );
  };
  //TODO editUserData: add functionality to update user picture
  renderProfilePicture = () => (
    <span
      style={{
        position: "relative",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
      }}
    >
      <img
        className="panel-image"
        src={this.props.photoURL ? this.props.photoURL + "?height=800" : defaultPic}
        alt="Your profile"
        onMouseEnter={() => this.updateProfilePictureHovered(true)}
        onMouseLeave={() => this.updateProfilePictureHovered(false)}
      />
      {this.renderProfilePictureEditPencil()}
    </span>
  );

  renderDisplayEditPencil = () => {
    if (!this.state.displayNameHovered) {
      return null;
    }

    return (
      <img
        style={{ position: "absolute", right: "-35px", bottom: "10px" }}
        width="20px"
        src="https://image.flaticon.com/icons/svg/61/61456.svg"
      />
    );
  };

  renderDisplayName = () => (
    <div className="panel-name">
      <span
        style={{ position: "relative" }}
        onMouseEnter={() => this.updateDisplayNameHovered(true)}
        onMouseLeave={() => this.updateDisplayNameHovered(false)}
        onClick={() => this.updateEditingDisplayName(true)}
      >
        {this.props.displayName || "Joe Bruin"}
        {this.renderDisplayEditPencil()}
      </span>
    </div>
  );

  renderPanelOptions = () => (
    <div className="panel-options">
      <ul className="panel-options-list">
        <li className="panel-options-item">Profile</li>{" "}
        <li className="panel-options-item">Sketches</li>{" "}
        <li className="panel-options-item" onClick={() => firebase.auth().signOut()}>
          Sign Out
        </li>
      </ul>
    </div>
  );

  renderEditDisplayName = () => {
    return (
      <EditDisplayNameInput
        initialValue={this.props.displayName}
        submitEdit={value => {
          this.props.setDisplayName(value);
          this.updateEditingDisplayName(false);
        }}
      />
    );
  };

  updateDisplayNameHovered = displayNameHovered => this.setState({ displayNameHovered });
  updateProfilePictureHovered = profilePictureHovered => this.setState({ profilePictureHovered });
  updateEditingDisplayName = editingDisplayName => this.setState({ editingDisplayName });

  render() {
    const {
      panelStyle,
      panelVisible,
      size,
      handleOnSizeChange,
      handleOnVisibleChange,
    } = this.props;

    console.log("props", this.props);
    console.log("state", this.state);
    return (
      <div style={panelStyle}>
        <Dock
          position="left"
          isVisible={panelVisible}
          size={size}
          dimMode="transparent"
          onSizeChange={newSize => {
            if (newSize < 0.3)
              //limiting the max size of the panel to 30% of the screen
              handleOnSizeChange(newSize);
          }}
          onVisibleChange={handleOnVisibleChange}
          dockStyle={panelStyle}
        >
          <div className="panel">
            {this.renderCollapseButton()}
            <div className="panel-content">
              {this.renderProfilePicture()}
              {this.state.editingDisplayName
                ? this.renderEditDisplayName()
                : this.renderDisplayName()}
              {this.renderPanelOptions()}
            </div>
            <div className="editor-footer">
              <img className="editor-footer-image" src="img/tla-footer.png" alt="footer" />
            </div>
          </div>
        </Dock>
      </div>
    );
  }
}

export default ProfilePanel;
