import React from "react";
import ReactModal from "react-modal";

import { Button, Input, InputGroup, InputGroupAddon } from "reactstrap";

import { faCopy, faUser, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "styles/Modals.scss";
import { text } from "@fortawesome/fontawesome-svg-core";

/**
 * ShareSketchModal is a full-screen modal that displays
 * the current program's view-only route, which the user can manually
 * copy or use the "Copy To Clipboard" Button
 * @param {Boolean} showModal modal render state
 * @param {Function} toggleModal function that toggles the modal's render state
 * @param {String} shareUrl the URL to display/copy to clipboard
 */
class ShareSketchModal extends React.Component {
  state = {
    copyStatus: 'Hit "Copy to Clipboard"!',
  };

  initiateCopy = (textToBeCopied) => {
    navigator.clipboard.writeText(textToBeCopied).then(
      () => {
        // success
        this.setState({ copyStatus: "Successfully copied!" });
      },
      () => {
        // failed
        this.setState({ copyStatus: "Copy failed. If this keeps on happening, let us know!" });
      },
    );
  };

  render = () => {
    return (
      <ReactModal
        className="modal-md"
        overlayClassName="modal-overlay"
        isOpen={this.props.showModal}
        onRequestClose={this.props.toggleModal}
        ariaHideApp={false}
      >
        <h2 className="text-center">Share This Sketch</h2>
        <InputGroup>
          <Input value={this.props.shareUrl} disabled />
          <InputGroupAddon addonType="append">
            <Button color="primary" onClick={() => this.initiateCopy(this.props.shareUrl)}>
              <FontAwesomeIcon icon={faCopy} /> Copy to Clipboard
            </Button>
          </InputGroupAddon>
        </InputGroup>
        <hr />
        <h2 className="text-center">Collab Session</h2>
        <div style={{ textAlign: "center", marginBottom: "2%", marginTop: "1%" }}>
          <Button color="primary" onClick={() => this.props.createCollabSession()}>
            <FontAwesomeIcon icon={faUserFriends} /> Create a Collab session
          </Button>
        </div>
        <InputGroup>
          <Input value={this.props.collabId === null ? "" : this.props.collabId} disabled />
          <InputGroupAddon addonType="append">
            <Button color="primary" onClick={() => this.initiateCopy(this.props.collabId)}>
              <FontAwesomeIcon icon={faCopy} /> Copy to Clipboard
            </Button>
          </InputGroupAddon>
        </InputGroup>
        <hr />
        <p className="text-center">{this.state.copyStatus}</p>
      </ReactModal>
    );
  };
}

export default ShareSketchModal;
