import {
  faBook,
  faCheckSquare,
  faEdit,
  faPencilAlt,
  faSignOutAlt,
  faMoon,
  faSun,
  faTimes,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import firebase from 'firebase/app';
import 'firebase/auth';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Row, Col, Button } from 'reactstrap';
import {
  PHOTO_NAMES,
  DEFAULT_PHOTO_NAME,
  PANEL_SIZE,
  PANEL_IMAGE_SELECTOR_SIZE,
} from '../../constants';
import '../../styles/Panel.scss';

import { isValidDisplayName } from '../../lib/validate';
import Footer from './Footer';
import ImageSelector from './ImageSelector';
import Switch from './Switch';

/** --------Props--------
 * togglePanel: function to be called when the panel is collapsed or opened
 */

const ProfilePanel = function (props) {
  // Props
  const {
    photoName,
    setPhotoName,
    displayName,
    setDisplayName,
    contentType,
    theme,
    onThemeChange,
    togglePanel,
    left,
    screenHeight,
    uid,
    developerAcc,
  } = props;

  // States
  const [nameIsHovering, setNameHover] = useState(false);
  const [imageIsHovering, setImageHover] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [nameSubmitted, setNameSubmitted] = useState(false);
  const [name, setName] = useState(displayName);
  const [selectedImage, setSelectedImage] = useState('');
  const [displayNameMessage, setDisplayNameMessage] = useState('');
  const [error, setError] = useState(''); // setError is never used

  // State Changing functions
  const handleOpenModal = () => {
    setShowModal(true);
    setSelectedImage(photoName);
  };

  const handleCloseModal = () => {
    setSelectedImage('');
    setShowModal(false);
  };

  const handleEditNameClick = () => {
    setEditingName(true);
  };

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const onNameSubmit = (e) => {
    e.preventDefault();

    const { ok, message } = isValidDisplayName(name);
    if (!ok) {
      setName(displayName);
      setEditingName(true);
      setDisplayNameMessage(message);
    } else {
      setDisplayName(name);
      setEditingName(false);
      setNameSubmitted(true);
      setDisplayNameMessage('');
      setTimeout(() => {
        setNameSubmitted(false);
      }, 500);
    }
  };

  /**
   * dispatches Redux action that changes current photo to new photo, and updates backend;
   * closes the modal; resets the state
   */
  const onImageSubmit = () => {
    // SEND IMAGE NAME TO BACKEND, CHANGE IMAGE
    setPhotoName(selectedImage);
    handleCloseModal();
    setSelectedImage('');
  };

  const renderErrorMessage = (msg, addBreak) => {
    if (msg) {
      return (
        <span>
          <div className="profile-input-error">{msg}</div>
        </span>
      );
    }

    return addBreak ? <br /> : null;
  };

  const renderPanelImage = () => (
    <div
      className="panel-image-container"
      onMouseEnter={() => setImageHover(true)}
      onMouseLeave={() => setImageHover(false)}
    >
      <img
        className="panel-image"
        // needs to be edited to use profile image name
        src={PHOTO_NAMES[photoName] || PHOTO_NAMES[DEFAULT_PHOTO_NAME]}
        alt="Your profile"
      />
      {imageIsHovering && (
        <button className="image-edit-button" onClick={handleOpenModal}>
          <FontAwesomeIcon icon={faEdit} />
        </button>
      )}
    </div>
  );

  const onImageClick = (name) => {
    setSelectedImage(name);
  };

  const renderImageModal = () => {
    const names = Object.keys(PHOTO_NAMES);
    const icons = names.map((val) => (
      <figure className="gallery-item" key={val} onClick={() => onImageClick(val)}>
        <img
          src={PHOTO_NAMES[val]}
          className={`gallery-img${selectedImage === val ? '-selected' : ''}`}
          alt="icon"
        />
      </figure>
    ));
    return (
      <ImageSelector
        isOpen={showModal}
        closeModal={handleCloseModal}
        icons={icons}
        error={error}
        maxWidth={PANEL_IMAGE_SELECTOR_SIZE}
        className="image-selector"
      >
        <Row>
          <Col>
            <Button
              color="success"
              size="lg"
              onClick={onImageSubmit}
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

  const renderName = () => {
    if (!editingName) {
      return (
        <div
          className="panel-name"
          onMouseEnter={() => setNameHover(true)}
          onMouseLeave={() => setNameHover(false)}
          onClick={handleEditNameClick}
        >
          <div className="panel-name-text">{name || 'Joe Bruin'}</div>
          {nameIsHovering && (
            <button className="edit-icon-image" onClick={handleEditNameClick}>
              <FontAwesomeIcon icon={faEdit} />
            </button>
          )}
          <div className="submitted-icon-image" style={{ opacity: +(nameSubmitted ? '1' : '0') }}>
            <FontAwesomeIcon icon={faCheckSquare} />
          </div>
        </div>
      );
    }
    return (
      <form className="panel-edit-container" onSubmit={onNameSubmit}>
        <input
          autoFocus
          className="panel-edit"
          placeholder={displayName}
          onChange={onNameChange}
          value={name}
          onBlur={onNameSubmit}
        />
      </form>
    );
  };

  const renderEditorButton = () => (
    <Link
      to={{ pathname: '/editor' }}
      className="panel-button btn btn-secondary btn-lg btn-block"
      key="editor-button"
      id="editor-button"
    >
      <FontAwesomeIcon icon={faPencilAlt} />
      <span className="panel-button-text">Editor</span>
    </Link>
  );

  const renderClassesButton = () => (
    developerAcc ? (
      <Link
        to={{ pathname: '/classes' }}
        className="panel-button btn btn-secondary btn-lg btn-block"
        key="classes-button"
        id="classes-button"
      >
        <FontAwesomeIcon icon={faBook} />
        <span className="panel-button-text">Classes</span>
      </Link>
    ) : ''
  );

  const renderSketchesButton = () => (
    <Link
      to={{ pathname: '/sketches' }}
      className="panel-button btn btn-secondary btn-lg btn-block"
      key="sketches-button"
      id="sketches-button"
    >
      <FontAwesomeIcon icon={faBook} />
      <span className="panel-button-text">Sketches</span>
    </Link>
  );

  const renderSignOutButton = () => (
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

  const renderButtons = () => {
    const panelButtons = [];
    switch (contentType) {
    case 'sketches':
      panelButtons.push(renderEditorButton());
      panelButtons.push(renderClassesButton());
      break;
    case 'classes':
    case 'classPage':
      panelButtons.push(renderEditorButton());
      panelButtons.push(renderSketchesButton());
      break;
    case 'editor':
    default:
      panelButtons.push(renderSketchesButton());
      panelButtons.push(renderClassesButton());
      break;
    }

    panelButtons.push(renderSignOutButton());

    return <div className="panel-buttons">{panelButtons}</div>;
  };

  const renderThemeSwitch = () => {
    const onToggle = (on) => {
      onThemeChange(on ? 'light' : 'dark');
    };

    return (
      <Switch
        on={theme === 'dark'}
        onToggle={onToggle}
        onImg={<FontAwesomeIcon icon={faMoon} className="icon-dark" />}
        offImg={<FontAwesomeIcon icon={faSun} className="icon-light" />}
      />
    );
  };

  const renderLoginButton = () => (
    <Link
      to={{ pathname: '/login' }}
      className="panel-button btn btn-secondary btn-lg btn-block"
      key="login-button"
      id="login-button"
    >
      <FontAwesomeIcon icon={faUserCircle} />
      <span className="panel-button-text">Login</span>
    </Link>
  );

  const renderCreateUserButton = () => (
    <Link
      to={{ pathname: '/createUser' }}
      className="panel-button btn btn-secondary btn-lg btn-block"
      key="create-user-button"
      id="create-user-button"
    >
      {/* <FontAwesomeIcon icon={faPencilAlt} /> */}
      <span className="panel-button-text">Create User</span>
    </Link>
  );

  const renderLoggedOutContent = () => (
    <div className="panel-content">
      <div className="panel-buttons">
        {renderLoginButton()}
        {renderCreateUserButton()}
      </div>
      {renderThemeSwitch()}
    </div>
  );

  const renderContent = () => (
    <div className="panel-content">
      {renderPanelImage()}
      {renderImageModal()}
      {renderName()}
      {renderErrorMessage(displayNameMessage)}
      {renderButtons()}
      {renderThemeSwitch()}
    </div>
  );

  const renderCollapseButton = () => (
    <div className="panel-collapse-button" onClick={togglePanel}>
      <FontAwesomeIcon icon={faTimes} />
    </div>
  );

  const panelStyle = {
    left,
    height: screenHeight,
    width: PANEL_SIZE,
  };
  return (
    <div className="panel" style={panelStyle}>
      {renderCollapseButton()}
      {uid ? renderContent() : renderLoggedOutContent()}
      <Footer />
    </div>
  );
};

export default ProfilePanel;
