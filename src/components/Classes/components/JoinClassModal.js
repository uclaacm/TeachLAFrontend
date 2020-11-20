import React from "react";
import * as fetch from "../../../lib/fetch.js";
import { Redirect } from "react-router-dom";

import { Button, Container, Row, Col, FormGroup, Label, Input } from "reactstrap";

import ReactModal from "react-modal";

class JoinClassModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wid: "",
      disableSubmit: false,
      error: "",
      redirect: false,
    };
  }

  closeModal = () => {
    if (this.props.onClose && {}.toString.call(this.props.onClose) === "[object Function]") {
      this.props.onClose();
    }

    this.setState({
      wid: "",
      error: "",
      disableSubmit: false,
    });
  };

  badInput = () => {
    if (!this.state.wid) {
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
      wid: this.state.wid,
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
              error: json.error || "There was a problem joining the class, please try again!",
            });
            return;
          }
          this.props.addClass(json.data.cid, json || {});
          this.setState({ redirect: true });
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
    let testCid = Math.floor(Math.random() * 10);
    this.props.addClass(testCid,
      {
        thumbnail: Math.floor(Math.random() * 20),
        name: "Class ".concat(classLetter),
        creator: "HASH0",
        instructors: [ "Prof. ".concat(classLetter) ],
        members: [ "HASH3", "HASH4", "HASH5" ],
        programs: [ "HASH6", "HASH7" ],
        cid: testCid,
        wid: this.state.wid,
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
          <h1 className="text-center">Join a Class</h1>
          <hr />
          <FormGroup row>
            <Label className="text-right" for="class-code" xs={4}>
              Enter class code:
            </Label>
            <Col xs={8}>
              <Input
                className="sketches-modal-input"
                onChange={(e) => this.setState({ wid: e.target.value })}
                value={this.state.wid}
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
                Join
              </Button>
            </Col>
          </Row>
        </Container>
      </ReactModal>
    );
  };

  render() {
    if (this.state.redirect) {
      // Need to send them to the right class page
      return <Redirect to="/class" />;
    }

    return this.renderModal();
  }
}

export default JoinClassModal;
