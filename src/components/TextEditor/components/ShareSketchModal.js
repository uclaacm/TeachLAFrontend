import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import ReactModal from 'react-modal';

import {
  Button, Input, InputGroup,
} from 'reactstrap';

import '../../../styles/Modals.scss';

/**
 * ShareSketchModal is a full-screen modal that displays
 * the current program's view-only route, which the user can manually
 * copy or use the "Copy To Clipboard" Button
 * @param {Boolean} showModal modal render state
 * @param {Function} toggleModal function that toggles the modal's render state
 * @param {String} shareUrl the URL to display/copy to clipboard
 */
class ShareSketchModal extends React.Component {
  constructor(props) {
    super(props);
    state = {
      copyStatus: 'Hit "Copy to Clipboard"!',
    };
  }

  initiateCopy = () => {
    navigator.clipboard.writeText(this.props.shareUrl).then(
      () => {
        // success
        this.setState({ copyStatus: 'Successfully copied!' });
      },
      () => {
        // failed
        this.setState({ copyStatus: 'Copy failed. If this keeps on happening, let us know!' });
      },
    );
  };

  render() { return <ReactModal
      className="modal-md"
      overlayClassName="modal-overlay"
      isOpen={this.props.showModal}
      onRequestClose={this.props.toggleModal}
      ariaHideApp={false}
    >
      <h2 className="text-center">Share This Sketch</h2>
      <InputGroup>
        <Input value={this.props.shareUrl} disabled />
        <Button color="primary" onClick={this.initiateCopy}>
          <FontAwesomeIcon icon={faCopy} />
          {' '}
          Copy to Clipboard
        </Button>
      </InputGroup>
      <hr />
      <p className="text-center">{this.state.copyStatus}</p>
    </ReactModal>
  };
}

export default ShareSketchModal;
