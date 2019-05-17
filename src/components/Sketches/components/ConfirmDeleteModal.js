import React from "react";
import ReactModal from "react-modal";
import { Container, Row, Col, Button } from "reactstrap";

class ConfirmDeleteModal extends React.Component {
  componentWillMount() {}
  componentDidUpdate() {}

  closeModal = () => {
    if (this.props.onClose && {}.toString.call(this.props.onClose) === "[object Function]") {
      this.props.onClose();
    }
  };

  render() {
    return (
      <ReactModal
        isOpen={this.props.isOpen}
        onRequestClose={this.closeModal}
        className="sketches-modal"
        overlayClassName="profile-image-overlay"
        ariaHideApp={false}
      >
        <Container>
          <h2 className="text-center">
            Are you sure you want to delete "{this.props.sketchName}"?
          </h2>
          <hr />
          <Row>
            <Col>
              <Button color="secondary" onClick={this.closeModal} size="lg" block>
                No thanks!
              </Button>
            </Col>
            <Col>
              <Button color="danger" size="lg" block>
                Delete Forever!
              </Button>
            </Col>
          </Row>
        </Container>
      </ReactModal>
    );
  }
}

export default ConfirmDeleteModal;
