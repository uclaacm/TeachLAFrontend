import React from "react";
import ReactModal from "react-modal";
import { Container } from "reactstrap";
class ImageSelector extends React.Component {
  render(){
    return(
      <ReactModal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.closeModal}
        className="sketches-image-modal"
        overlayClassName="profile-image-overlay"
        ariaHideApp={false}
      >
        <Container style={{"max-width": `${this.props.maxWidth}px`,}}>
          <div className="sketches-modal-header d-flex align-items-center">
            <h1>Choose a thumbnail</h1>
            <div className="sketches-modal-header-thumbnail-container">{this.props.thumbnailPreview || null}</div>
          </div>
          <hr />
          <div className="sketches-gallery">{this.props.icons}</div>
          <br />
          <div className="text-center text-danger">{this.props.error || <br />}</div>
          <hr />
          {this.props.children} {/* Used for close buttons or not at all if not needed */}
        </Container>
      </ReactModal>
    )
  } 
}

export default ImageSelector;