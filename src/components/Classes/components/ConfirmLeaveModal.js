import React from "react";
import ReactModal from "react-modal";
import { Container, Row, Col, Button } from "reactstrap";
import * as fetch from "../../../lib/fetch.js";

class ConfirmLeaveModal extends React.Component {
  closeModal = () => {
    if (this.props.onClose && {}.toString.call(this.props.onClose) === "[object Function]") {
      this.props.onClose();
    }
  };

  onLeaveSubmit = () => {
    let data = {
      uid: this.props.uid,
      cid: this.props.cid,
    };

    try {
      fetch
        .leaveClass(data)
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          if (!json.ok) {
            this.setState({
              spinner: false,
              error: json.error || "Failed to leave the class, please try again later",
            });
            return;
          }
          this.props.removeStudentClass(this.props.cid);
          this.props.inClass ? this.props.unsetClass() : this.closeModal();
        })
        .catch((err) => {
          this.setState({
            spinner: false,
            error: "Failed to leave the class, please try again later",
          });
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }

    // Testing stuff (do this instead of the try-catch block):
    // this.props.removeStudentClass(this.props.cid);
    // this.props.inClass ? this.props.unsetClass() : this.closeModal();
    // end of test stuff

    this.setState({ spinner: true, error: "" });
  };

  render() {
    return (
      <ReactModal
        isOpen={this.props.isOpen}
        onRequestClose={this.closeModal}
        className="sketches-modal"
        ariaHideApp={false}
      >
        <Container>
          <h3 className="text-center">
            Are you sure you want to permanently leave the class "{this.props.className}"?
          </h3>
          <hr />
          <Row>
            <Col>
              <Button color="secondary" onClick={this.closeModal} size="lg" block>
                No thanks!
              </Button>
            </Col>
            <Col>
              <Button color="danger" onClick={this.onLeaveSubmit} size="lg" block>
                Yes, leave.
              </Button>
            </Col>
          </Row>
        </Container>
      </ReactModal>
    );
  }
}

export default ConfirmLeaveModal;
