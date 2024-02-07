import React from 'react';
import ReactModal from 'react-modal';
import { Container } from 'reactstrap';
import '../../styles/ImageSelector.scss';

interface ImageSelectorProps {
  isOpen: boolean;
  closeModal: () => void;
  maxWidth: number;
  thumbnailPreview?: React.ReactElement | null; // either <img> element or null
  icons: any; // array of <figure> elements
  error: string; // error message
  children: React.ReactNode;
}

const ImageSelector = function ({
  isOpen, closeModal, maxWidth, thumbnailPreview, icons, error, children,
}: ImageSelectorProps) {
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

ImageSelector.defaultProps = {
  thumbnailPreview: null,
};

export default ImageSelector;
