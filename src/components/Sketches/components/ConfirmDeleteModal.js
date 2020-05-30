import React from "react";
import ReactModal from "react-modal";
import { Container, Row, Col, Button } from "reactstrap";
import * as fetch from "../../../lib/fetch.js";

class ConfirmDeleteModal extends React.Component {
  closeModal = () => {
    if (this.props.onClose && {}.toString.call(this.props.onClose) === "[object Function]") {
      this.props.onClose();
    }
  };

  onDeleteSubmit = () => {
    let data = {
      uid: this.props.uid,
      docID: this.props.sketchKey,
      name: this.props.sketchKey,
    };
    try {
      fetch
        .deleteSketch(data)
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          if (!json.ok) {
            this.setState({
              spinner: false,
              error: json.error || "Failed to create sketch, please try again later",
            });
            return;
          }

          this.props.deleteProgram(this.props.sketchKey);

          // this next piece of code is a guard against deleting mostRecentProgram - if we do,
          // then we need to re-populate it with something different.
          if (
            this.props.sketchKey === this.props.mostRecentProgram &&
            this.props.programKeys.size > 0
          ) {
            this.props.setMostRecentProgram(this.props.programKeys.get(0));
          }

          this.closeModal();
        })
        .catch((err) => {
          this.setState({
            spinner: false,
            error: "Failed to create sketch, please try again later",
          });
          console.error(err);
        });
    } catch (err) {
      console.error(err);
    }
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
              <Button color="danger" onClick={this.onDeleteSubmit} size="lg" block>
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
