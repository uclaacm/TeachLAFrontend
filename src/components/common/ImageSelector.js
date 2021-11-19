import React from 'react';
import ReactModal from 'react-modal';
import { Container } from 'reactstrap';
import '../../styles/ImageSelector.scss';

const ImageSelector = function (props) {
  // Extracting all data from props
  const {
    isOpen, closeModal, maxWidth, thumbnailPreview, icons, error, children,
  } = props;
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className="image-selector-modal"
      overlayClassName="profile-image-overlay"
      ariaHideApp={false}
    >
      <Container style={{ maxWidth: `${maxWidth}px` }}>
        <div className=".image-selector-modal-header d-flex align-items-center">
          <h1>Choose a thumbnail</h1>
          <div className="image-selector-modal-header-thumbnail-container">
            {thumbnailPreview || null}
          </div>
        </div>
        <hr />
        <div className="image-selector-gallery">{icons}</div>
        <br />
        <div className="text-center text-danger">{error || <br />}</div>
        <hr />
        {children}
        {' '}
        {/* Footer buttons as passed in as children */}
      </Container>
    </ReactModal>
  );
};

export default ImageSelector;
