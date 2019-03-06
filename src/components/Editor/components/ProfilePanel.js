import React from "react";
import defaultPic from "../../../img/defaultProfile.png";
import firebase from "firebase";
import Filter from "../../../../node_modules/bad-words/lib/badwords.js";
import {
  MINIMUM_DISPLAY_NAME_LENGTH,
  MAXIMUM_DISPLAY_NAME_LENGTH,
  PROFILE_IMG_1,
  PROFILE_IMG_1_URL,
  PROFILE_IMG_2,
  PROFILE_IMG_2_URL,
  PROFILE_IMG_3,
  PROFILE_IMG_3_URL,
} from "../../../constants";
import ReactModal from "react-modal";

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
      nameIsHovering: false,
      imageIsHovering: false,
      editing: false,
      showModal: false,
      name: "",
      profileImage: "",
      displayNameMessage: "",
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentDidUpdate() {}

  handleOpenModal() {
    this.setState({ showModal: true, profileImage: "" });
  }

  handleCloseModal() {
    this.setState({ profileImage: "", showModal: false });
  }

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

  onNameSubmit = e => {
    e.preventDefault();
    let badInputs = this.checkInputs();

    if (badInputs) {
      this.setState({ name: "", nameIsHovering: true, editing: false });
      return;
    } else {
      this.props.setDisplayName(this.state.name);
      this.setState({ name: "", nameIsHovering: true, editing: false, displayNameMessage: "" });
      return;
    }
  };

  onImageSubmit = () => {
    // SEND IMAGE NAME TO BACKEND, CHANGE IMAGE
    this.handleCloseModal();
    this.setState({ profileImage: "" });
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
        onMouseEnter={() => this.setState({ imageIsHovering: true })}
        onMouseLeave={() => this.setState({ imageIsHovering: false })}
      >
        <img
          className="panel-image"
          src={this.props.photoURL ? this.props.photoURL : defaultPic} // needs to be edited to use profile image name
          alt="Your profile"
        />{" "}
        {this.state.imageIsHovering && (
          <button className="image-edit-button" onClick={this.handleOpenModal}>
            Edit
          </button>
        )}
      </div>
    );
  };

  onImageClick = name => {
    console.log(name);
    this.setState(prevState => {
      return { profileImage: name };
    });
  };

  renderImageModal = () => {
    return (
      <div>
        <ReactModal
          isOpen={this.state.showModal}
          onRequestClose={this.handleCloseModal}
          className="profile-image-modal"
          overlayClassName="profile-image-overlay"
        >
          <div className="gallery">
            <figure className="gallery__item" onClick={() => this.onImageClick(PROFILE_IMG_1)}>
              <img src={PROFILE_IMG_1_URL} className="gallery__img" />
            </figure>
            <figure className="gallery__item" onClick={() => this.onImageClick(PROFILE_IMG_2)}>
              <img src={PROFILE_IMG_2_URL} className="gallery__img" />
            </figure>
            <figure className="gallery__item" onClick={() => this.onImageClick(PROFILE_IMG_3)}>
              <img src={PROFILE_IMG_3_URL} className="gallery__img" />
            </figure>
            <figure className="gallery__item" onClick={() => this.onImageClick(PROFILE_IMG_1)}>
              <img src={PROFILE_IMG_1_URL} className="gallery__img" />
            </figure>
            <figure className="gallery__item" onClick={() => this.onImageClick(PROFILE_IMG_2)}>
              <img src={PROFILE_IMG_2_URL} className="gallery__img" />
            </figure>
            <figure className="gallery__item" onClick={() => this.onImageClick(PROFILE_IMG_3)}>
              <img src={PROFILE_IMG_3_URL} className="gallery__img" />
            </figure>
            <figure className="gallery__item" onClick={() => this.onImageClick(PROFILE_IMG_1)}>
              <img src={PROFILE_IMG_1_URL} className="gallery__img" />
            </figure>
            <figure className="gallery__item" onClick={() => this.onImageClick(PROFILE_IMG_2)}>
              <img src={PROFILE_IMG_2_URL} className="gallery__img" />
            </figure>
            <figure className="gallery__item" onClick={() => this.onImageClick(PROFILE_IMG_3)}>
              <img src={PROFILE_IMG_3_URL} className="gallery__img" />
            </figure>
          </div>

          <button onClick={this.handleCloseModal}>Cancel</button>
          <button onClick={this.onImageSubmit}>Submit</button>
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
              <img src="https://i.imgur.com/wQgAOcF.png" width="20px" alt="" />
            </button>
          )}
        </div>
      );
    } else {
      return (
        <form onMouseLeave={this.handleMouseHover} onSubmit={this.onNameSubmit}>
          <input
            autoFocus
            className="panel-edit"
            placeholder={this.props.displayName}
            onChange={this.onNameChange}
            onSubmit={this.onNameSubmit}
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
        <div>{this.renderPanelImage()}</div>
        <div>{this.renderImageModal()}</div>
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
