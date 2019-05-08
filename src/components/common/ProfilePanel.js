import React from "react";
import { Redirect } from "react-router-dom";
import firebase from "firebase";
import {
  MINIMUM_DISPLAY_NAME_LENGTH,
  MAXIMUM_DISPLAY_NAME_LENGTH,
  PHOTO_NAMES,
  DEFAULT_PHOTO_NAME,
} from "../../constants";
import ReactModal from "react-modal";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**--------Props--------
 * togglePanel: function to be called when the panel is collapsed or opened
 */

class ProfilePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prevWidth: 0,
      width: this.props.width,
      nameIsHovering: false,
      imageIsHovering: false,
      editing: false,
      showModal: false,
      name: this.props.displayName,
      selectedImage: "",
      displayNameMessage: "",
      redirectTo: "",
    };
  }

  componentDidUpdate() {}

  handleOpenModal = () => {
    this.setState({ showModal: true, selectedImage: this.props.photoName });
  };

  handleCloseModal = () => {
    this.setState({ selectedImage: "", showModal: false });
  };

  handleEditNameClick = () => {
    this.setState(prevState => {
      return { editing: true };
    });
  };

  handleEditImageClick = () => {
    this.setState(prevState => {
      return { showModal: true };
    });
  };

  onNameChange = e => {
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
          "Only use upper case, lower case, numbers, spaces, and/or the following special characters !@#$%",
      });
      return true;
    }
    return false;
  };

  onNameSubmit = e => {
    e.preventDefault();
    let badInputs = this.checkInputs();

    if (badInputs) {
      this.setState({ name: this.props.displayName, editing: false });
      return;
    } else {
      this.props.setDisplayName(this.state.name);
      this.setState({ editing: false, displayNameMessage: "" });
      return;
    }
  };

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
        className="panel-image-container"
        onMouseEnter={() => this.setState({ imageIsHovering: true })}
        onMouseLeave={() => this.setState({ imageIsHovering: false })}
      >
        <img
          className="panel-image"
          src={PHOTO_NAMES[this.props.photoName] || PHOTO_NAMES[DEFAULT_PHOTO_NAME]} // needs to be edited to use profile image name
          alt="Your profile"
        />
        {this.state.imageIsHovering && (
          <button className="image-edit-button" onClick={this.handleOpenModal}>
            <FontAwesomeIcon icon={faEdit} color={"#292929"} />
          </button>
        )}
      </div>
    );
  };

  onImageClick = name => {
    this.setState(prevState => {
      return { selectedImage: name };
    });
  };

  renderImageModal = () => {
    let names = Object.keys(PHOTO_NAMES);
    let icons = names.map(val => {
      return (
        <figure className="gallery-item" key={val} onClick={() => this.onImageClick(val)}>
          <img
            src={PHOTO_NAMES[val]}
            className={"gallery-img" + (this.state.selectedImage === val ? "-selected" : "")}
            alt="icon"
          />
        </figure>
      );
    });
    return (
      <div>
        <ReactModal
          isOpen={this.state.showModal}
          onRequestClose={this.handleCloseModal}
          className="profile-image-modal"
          overlayClassName="profile-image-overlay"
          ariaHideApp={false}
        >
          <div className="gallery">{icons}</div>

          <button onClick={this.onImageSubmit} className="modal-submit-button">
            Submit
          </button>
        </ReactModal>
      </div>
    );
  };

  renderName = () => {
    if (!this.state.editing) {
      return (
        <div
          className="panel-name"
          onMouseEnter={() => this.setState({ nameIsHovering: true })}
          onMouseLeave={() => this.setState({ nameIsHovering: false })}
          onClick={this.handleEditNameClick}
        >
          {this.props.displayName || "Joe Bruin"}
          {this.state.nameIsHovering && (
            <button className="edit-icon-image" onClick={this.handleEditNameClick}>
              <FontAwesomeIcon icon={faEdit} color={"#292929"} />
            </button>
          )}
        </div>
      );
    } else {
      return (
        <form className="panel-edit-container" onSubmit={this.onNameSubmit}>
          <input
            autoFocus
            className="panel-edit"
            placeholder={this.props.displayName}
            onChange={this.onNameChange}
            value={this.state.name}
            onBlur={this.onNameSubmit}
          />
        </form>
      );
    }
  };

  renderProfileButton = disabled => (
    <div className={"panel-options-item" + (disabled ? "-disabled" : "")} key="profile">
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

  renderEditorButton = disabled => (
    <div
      key="editor"
      className={"panel-options-item" + (disabled ? "-disabled" : "")}
      onClick={() => {
        if (!disabled) {
          this.setState({ redirectTo: "/editor" });
        }
      }}
    >
      {disabled && (
        <img
          style={{ position: "absolute", height: "60px", right: "-2px", zIndex: 20, opacity: 0.9 }}
          alt="banner"
          src="img/coming-soon-banner.png"
        />
      )}
      <span className="panel-item-content">
        <span className="panel-item-icon">
          <img className={"panel-item-icon"} alt="house" src="img/house2.png" />
        </span>
        <span className="panel-item-name">Editor</span>
      </span>
    </div>
  );

  renderSketchesButton = disabled => (
    <div
      className={"panel-options-item" + (disabled ? "-disabled" : "")}
      key="sketches"
      onClick={() => {
        if (!disabled) {
          this.setState({ redirectTo: "/sketches" });
        }
      }}
    >
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
    <div className={"panel-options-item"} onClick={() => firebase.auth().signOut()} key="signout">
      <span className="panel-item-content">
        <span className="panel-item-icon">
          <img className={"panel-item-icon"} alt="exit" src="img/exit-icon.png" />
        </span>
        <span className="panel-item-name">Log Out</span>
      </span>
    </div>
  );

  renderButtons = () => {
    let panelButtons = [];

    switch (this.props.contentType) {
      case "sketches":
        panelButtons.push(this.renderEditorButton());
        break;
      case "editor":
        panelButtons.push(this.renderSketchesButton());
        break;
      default:
        break;
    }

    panelButtons.push(this.renderSignOutButton());

    return (
      <div className="panel-options">
        <div className="panel-options-list">{panelButtons}</div>
      </div>
    );
  };

  renderMainContent = () => (
    <div className="panel">
      <div className="panel-collapse-button">
        <div onClick={this.props.togglePanel}>
          <FontAwesomeIcon icon={faTimes} color={"#292929"} />
        </div>
      </div>
      <div className="panel-content">
        {this.renderPanelImage()}
        {this.renderImageModal()}
        {this.renderName()}
        {this.renderErrorMessage(this.state.displayNameMessage)}
        {this.renderButtons()}
      </div>
      <div className="editor-footer" />
    </div>
  );

  renderRedirect() {
    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo} />;
    }
    return null;
  }

  render() {
    const { panelStyle } = this.props;

    return (
      <div style={panelStyle}>
        {this.renderMainContent()}
        {this.renderRedirect()}
      </div>
    );
  }
}

export default ProfilePanel;
