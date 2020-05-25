import React from "react";
import ReactModal from "react-modal";
import { Container } from "reactstrap";
import "../../styles/ImageSelector.scss";
class ImageSelector extends React.Component {
  render() {
    return (
      <ReactModal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.closeModal}
        className="image-selector-modal"
        overlayClassName="profile-image-overlay"
        ariaHideApp={false}
      >
        <Container style={{ maxWidth: `${this.props.maxWidth}px` }}>
          <div className=".image-selector-modal-header d-flex align-items-center">
            <h1>Choose a thumbnail</h1>
            <div className="image-selector-modal-header-thumbnail-container">
              {this.props.thumbnailPreview || null}
            </div>
          </div>
          <hr />
          <div className="image-selector-gallery">{this.props.icons}</div>
          <br />
          <div className="text-center text-danger">{this.props.error || <br />}</div>
          <hr />
          {this.props.children} {/* Footer buttons as passed in as children */}
        </Container>
      </ReactModal>
    );
  }
}

export default ImageSelector;
