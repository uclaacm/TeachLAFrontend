import React from "react";
import * as fetch from "../../../lib/fetch.js";

import { Button, Container, Row, Col, FormGroup, Label, Input } from "reactstrap";

import ReactModal from "react-modal";

// TODO: finish this modal. it was from the join class modal and still has a lot I haven't changed.

class AddSketchModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sketchKey: "",
      disableSubmit: false,
      error: "",
    };
  }

  closeModal = () => {
    if (this.props.onClose && {}.toString.call(this.props.onClose) === "[object Function]") {
      this.props.onClose();
    }

    this.setState({
      sketchKey: "",
      error: "",
      disableSubmit: false,
    });
  };

  badInput = () => {
    if (!this.state.sketchKey) {
      this.setState({
        error: "Please enter the class code. You should get this from your instructor.",
      });
      return true;
    }
    // TODO: Check if class code input is formatted correctly

    return false;
  };

  onSubmit = async (e) => {
    e.preventDefault();

    if (this.badInput()) {
      return;
    }

    let data = {
      uid: this.props.uid,
      cid: this.state.sketchKey,
    };

    try {
      fetch
        .joinClass(data)
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          if (!json.ok) {
            this.setState({
              disableSubmit: false,
              error: json.error || "There was a problem joining the class, please try again",
            });
            return;
          }
          // TODO: figure out the response and fill this in correctly
          this.props.addClass(json.data.cid, json.data || {});
          this.closeModal();
        })
        .catch((err) => {
          this.setState({
            disableSubmit: false,
            error: "There was a problem joining the class, please try again",
          });
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }

    // Testing stuff (do this instead of the try-catch block):
    /*
    let classLetter = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    this.props.addClass(this.state.sketchKey,
      {
        key: this.state.sketchKey,
        name: "Class ".concat(classLetter),
        instructor: "Prof. ".concat(classLetter),
        thumbnail: Math.floor(Math.random() * 20),
        isInstr: false,
      });
    this.closeModal();
    */
    // end of testing stuff

    this.setState({ disableSubmit: true, error: "" });
  };

  renderModal = () => {
    return (
      <ReactModal
        isOpen={this.props.isOpen}
        onRequestClose={this.closeModal}
        className="sketches-modal"
        overlayClassName="profile-image-overlay"
        ariaHideApp={false}
      >
        <Container>
          <h1 className="text-center">Add a Sketch</h1>
          <hr />
          <FormGroup row>
            <Label className="text-right" for="class-code" xs={4}>
              Select a sketch to add:
            </Label>
            <Col xs={8}>
              <Input
                className="sketches-modal-input"
                onChange={(e) => this.setState({ sketchKey: e.target.value })}
                value={this.state.sketchKey}
                id="class-code"
              />
            </Col>
          </FormGroup>
          <br />
          <div className="text-center text-danger">{this.state.error || <br />}</div>
          <hr />
          <Row>
            <Col>
              <Button color="danger" onClick={this.closeModal} size="lg" block>
                Cancel
              </Button>
            </Col>
            <Col>
              <Button color="success" onClick={this.onSubmit} size="lg" block>
                Add to Class
              </Button>
            </Col>
          </Row>
        </Container>
      </ReactModal>
    );
  };

  render() {
    return this.renderModal();
  }
}

export default AddSketchModal;
