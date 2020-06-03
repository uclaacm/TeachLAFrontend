import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button } from "reactstrap";
import * as firebase from "firebase/app";
import "firebase/auth";
import {
  MINIMUM_DISPLAY_NAME_LENGTH,
  MAXIMUM_DISPLAY_NAME_LENGTH,
  PHOTO_NAMES,
  DEFAULT_PHOTO_NAME,
  PANEL_SIZE,
  PANEL_IMAGE_SELECTOR_SIZE,
} from "../../constants";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import "styles/Panel.scss";
import Switch from "./Switch";
import Footer from "./Footer";

import ImageSelector from "./ImageSelector";
/**--------Props--------
 * togglePanel: function to be called when the panel is collapsed or opened
 */

class ProfilePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameIsHovering: false,
      imageIsHovering: false,
      editingName: false,
      showModal: false,
      nameSubmitted: false,
      name: this.props.displayName,
      selectedImage: "",
      displayNameMessage: "",
    };
  }

  handleOpenModal = () => {
    this.setState({ showModal: true, selectedImage: this.props.photoName });
  };

  handleCloseModal = () => {
    this.setState({ selectedImage: "", showModal: false });
  };

  handleEditNameClick = () => {
    this.setState({ editingName: true });
  };

  handleEditImageClick = () => {
    this.setState({ showModal: true });
  };

  onNameChange = (e) => {
    this.setState({ name: e.target.value });
  };

  checkInputs = () => {
    const name = this.state.name;
    if (name.length < MINIMUM_DISPLAY_NAME_LENGTH || name.length > MAXIMUM_DISPLAY_NAME_LENGTH) {
      this.setState({
        displayNameMessage: `Display name must be between ${MINIMUM_DISPLAY_NAME_LENGTH}-${MAXIMUM_DISPLAY_NAME_LENGTH} characters long`,
      });
      return true;
    } else if (name.match(/[^a-zA-Z0-9!@#$% ]/)) {
      this.setState({
        displayNameMessage:
          "Only use letters, numbers, spaces, and/or the following special characters: !@#$%",
      });
      return true;
    }
    return false;
  };

  onNameSubmit = (e) => {
    e.preventDefault();
    let badInputs = this.checkInputs();

    if (badInputs) {
      this.setState({ name: this.props.displayName, editingName: true });
      return;
    } else {
      this.props.setDisplayName(this.state.name);
      this.setState({ editingName: false, nameSubmitted: true, displayNameMessage: "" });
      setTimeout(() => {
        this.setState({
          nameSubmitted: false,
        });
      }, 500);
      return;
    }
  };

  /**
   * dispatches Redux action that changes current photo to new photo, and updates backend; closes the modal; resets the state
   */
  onImageSubmit = () => {
    // SEND IMAGE NAME TO BACKEND, CHANGE IMAGE
    this.props.setPhotoName(this.state.selectedImage);
    this.handleCloseModal();
    this.setState({ selectedImage: "" });
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

  renderPanelImage = () => {
    return (
      <div
        className="panel-user-image-container"
        onMouseEnter={() => this.setState({ imageIsHovering: true })}
        onMouseLeave={() => this.setState({ imageIsHovering: false })}
      >
        <img
          className="panel-user-image"
          src={PHOTO_NAMES[this.props.photoName] || PHOTO_NAMES[DEFAULT_PHOTO_NAME]} // needs to be edited to use profile image name
          alt="Your profile"
        />
        {this.state.imageIsHovering && (
          <button className="panel-user-image-edit-button" onClick={this.handleOpenModal}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
        )}
      </div>
    );
  };

  renderImageModal = () => {
    if (!this.props.uid) {
      return null;
    }
    let names = Object.keys(PHOTO_NAMES);
    let icons = names.map((val) => {
      return (
        <figure
          className="gallery-item"
          key={val}
          onClick={() => this.setState({ selectedImage: val })}
        >
          <img
            src={PHOTO_NAMES[val]}
            className={"gallery-img" + (this.state.selectedImage === val ? "-selected" : "")}
            alt="icon"
          />
        </figure>
      );
    });
    return (
      <ImageSelector
        isOpen={this.state.showModal}
        closeModal={this.handleCloseModal}
        icons={icons}
        error={this.state.error}
        maxWidth={PANEL_IMAGE_SELECTOR_SIZE}
        className={"image-selector"}
      >
        <Row>
          <Col>
            <Button
              color="success"
              size="lg"
              onClick={this.onImageSubmit}
              id="modal-change-image-button"
              block
            >
              Submit
            </Button>
          </Col>
        </Row>
      </ImageSelector>
    );
  };

  renderName = () => {
    if (!this.state.editingName) {
      return (
        <div
          className="panel-user-name"
          onMouseEnter={() => this.setState({ nameIsHovering: true })}
          onMouseLeave={() => this.setState({ nameIsHovering: false })}
          onClick={this.handleEditNameClick}
        >
          <span className="panel-user-name-text">{this.props.displayName || "Joe Bruin"}</span>
          {this.state.nameIsHovering && (
            <button className="edit-icon-image" onClick={this.handleEditNameClick}>
              <FontAwesomeIcon icon={faEdit} />
            </button>
          )}
          <div
            className="panel-user-name-submittted-icon"
            style={{ opacity: +(this.state.nameSubmitted ? "1" : "0") }}
          >
            <FontAwesomeIcon icon={faCheckSquare} />
          </div>
        </div>
      );
    } else {
      return (
        <form className="panel-user-name-edit-container" onSubmit={this.onNameSubmit}>
          <input
            autoFocus
            className="panel-user-name-edit"
            placeholder={this.props.displayName}
            onChange={this.onNameChange}
            value={this.state.name}
            onBlur={this.onNameSubmit}
          />
        </form>
      );
    }
  };

  renderUserInformation = () => {
    if (this.props.uid) {
      // there exists a user
      return (
        <div className="panel-user-card">
          {this.renderPanelImage()}
          {this.renderName()}
        </div>
      );
    } else {
      // no user, render default image and name
      return (
        <div className="panel-user-card">
          <img
            className="panel-user-image"
            src={PHOTO_NAMES[DEFAULT_PHOTO_NAME]}
            alt="Guest User Profile"
          />
          <div className="panel-user-name">Guest User</div>
        </div>
      );
    }
  };

  renderEditorButton = () => (
    <Link
      to={{ pathname: "/editor" }}
      className="panel-button btn btn-secondary btn-lg btn-block"
      key="editor-button"
      id="editor-button"
    >
      <FontAwesomeIcon icon={faPencilAlt} />
      <span className="panel-button-text">Editor</span>
    </Link>
  );

  renderSketchesButton = () => (
    <Link
      to={{ pathname: "/sketches" }}
      className="panel-button btn btn-secondary btn-lg btn-block"
      key="sketches-button"
      id="sketches-button"
    >
      <FontAwesomeIcon icon={faBook} />
      <span className="panel-button-text">Sketches</span>
    </Link>
  );

  renderSignOutButton = () => (
    <Button
      className="panel-button"
      key="sign-out-button"
      id="sign-out-button"
      size="lg"
      block
      onClick={() => firebase.auth().signOut()}
    >
      <FontAwesomeIcon icon={faSignOutAlt} />
      <span className="panel-button-text">Log Out</span>
    </Button>
  );

  renderButtons = () => {
    let panelButtons = [];
    switch (this.props.contentType) {
      case "sketches":
        panelButtons.push(this.renderEditorButton());
        break;
      case "editor":
      default:
        panelButtons.push(this.renderSketchesButton());
        break;
    }

    panelButtons.push(this.renderSignOutButton());

    return <div className="panel-buttons">{panelButtons}</div>;
  };

  renderThemeSwitch = () => {
    let onToggle = (on) => {
      this.props.onThemeChange(on ? "light" : "dark");
    };

    return (
      <div className="panel-switch-container">
        <Switch
          on={this.props.theme === "dark" ? true : false}
          onToggle={onToggle}
          onImg={<FontAwesomeIcon icon={faMoon} className="icon-dark" />}
          offImg={<FontAwesomeIcon icon={faSun} className="icon-light" />}
        />
      </div>
    );
  };

  renderLoginButton = () => (
    <Link
      to={{ pathname: "/login" }}
      className="panel-button btn btn-secondary btn-lg btn-block"
      key="login-button"
      id="login-button"
    >
      <FontAwesomeIcon icon={faUserCircle} />
      <span className="panel-button-text">Login</span>
    </Link>
  );

  renderCreateUserButton = () => (
    <Link
      to={{ pathname: "/createUser" }}
      className="panel-button btn btn-secondary btn-lg btn-block"
      key="create-user-button"
      id="create-user-button"
    >
      {/* <FontAwesomeIcon icon={faPencilAlt} /> */}
      <span className="panel-button-text">Create User</span>
    </Link>
  );

  renderLoggedOutContent = () => (
    <div className="panel-content">
      {this.renderUserInformation()}
      <div className="panel-buttons">
        {this.renderLoginButton()}
        {this.renderCreateUserButton()}
      </div>
      {this.renderThemeSwitch()}
    </div>
  );

  renderContent = () => (
    <div className="panel-content">
      {this.renderUserInformation()}
      {this.renderErrorMessage(this.state.displayNameMessage)}
      {this.renderButtons()}
      {this.renderThemeSwitch()}
    </div>
  );

  renderCollapseButton = () => (
    <div className="panel-collapse-button" onClick={this.props.togglePanel}>
      <FontAwesomeIcon icon={faTimes} />
    </div>
  );

  render() {
    const panelStyle = {
      left: this.props.left,
      height: this.props.screenHeight,
      width: PANEL_SIZE,
    };
    return (
      <div className="panel" style={panelStyle}>
        {this.renderCollapseButton()}
        {this.props.uid ? this.renderContent() : this.renderLoggedOutContent()}
        <Footer />
        {this.renderImageModal()}
      </div>
    );
  }
}

export default ProfilePanel;
