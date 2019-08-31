import React from "react";
import { SketchThumbnailArray } from "../constants";
import * as fetch from "../../../lib/fetch.js";
import { Redirect } from "react-router-dom";

import { Button, Container, Row, Col, FormGroup, Label, Input } from "reactstrap";

import ReactModal from "react-modal";

class CreateClassModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      next: false,
      thumbnail: -1,
      disableSubmit: false,
      error: "",
      redirect: false,
    };
  }

  //==============React Lifecycle Functions Start===================//
  componentWillMount() {}

  componentDidUpdate() {}

  closeModal = () => {
    if (this.props.onClose && {}.toString.call(this.props.onClose) === "[object Function]") {
      this.props.onClose();
    }

    this.setState({
      next: false,
      name: "",
      thumbnail: -1,
      error: "",
      disableSubmit: false,
    });
  };

  setNext = val => {
    this.setState({
      next: val,
      error: "",
      disableSubmit: false,
    });
  };

  onBack = () => this.setNext(false);

  badThumbnailInput = () => {
    if (
      this.state.thumbnail === undefined ||
      this.state.thumbnail === "" ||
      this.state.thumbnail >= SketchThumbnailArray.length ||
      this.state.thumbnail < 0
    ) {
      // this.setState({error: "Please select a thumbnail"})
      return true;
    }

    return false;
  };

  badNameInput = () => {
    if (!this.state.name) {
      this.setState({ error: "Name is required" });
      return true;
    }
    if (this.state.name.length > 15) {
      this.setState({ error: "Name must be 15 characters or less" });
      return true;
    }

    return false;
  };

  onFirstSubmit = e => {
    e.preventDefault();
    if (this.badNameInput()) {
      return;
    }
    this.setNext(true);
  };

  onSecondSubmit = async e => {
    e.preventDefault();

    if (this.badThumbnailInput()) return;

    let data = {
      uid: this.props.uid,
      thumbnail: this.state.thumbnail,
      name: this.state.name,
      code: "",
    };

    try {
      fetch
        .createSketch(data)
        .then(res => {
          return res.json();
        })
        .then(json => {
          if (!json.ok) {
            this.setState({
              disableSubmit: false,
              error: json.error || "Failed to create sketch, please try again later",
            });
            return;
          }
          this.props.addProgram(json.data.key, json.data.programData || {});
          this.props.setMostRecentProgram(json.data.key);
          this.setState({ redirect: true });
          this.closeModal();
        })
        .catch(err => {
          this.setState({
            disableSubmit: false,
            error: "Failed to create sketch, please try again later",
          });
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
    this.setState({ disableSubmit: true, error: "" });
  };

  renderSecondModal = () => {
    let icons = SketchThumbnailArray.map((val, index) => {
      return (
        <figure
          className="sketches-gallery-item"
          key={val}
          onClick={() => this.setState({ thumbnail: index })}
        >
          <img
            src={`${process.env.PUBLIC_URL}/img/sketch-thumbnails/${val}.svg`}
            className={"sketches-gallery-img" + (this.state.thumbnail === index ? "-selected" : "")}
            alt="icon"
          />
        </figure>
      );
    });

    let thumbnailPreview =
      this.state.thumbnail !== -1 ? (
        <img
          src={`${process.env.PUBLIC_URL}/img/sketch-thumbnails/${
            SketchThumbnailArray[this.state.thumbnail]
          }.svg`}
          className={"sketches-modal-header-thumbnail"}
          alt="icon"
        />
      ) : null;
    return (
      <ReactModal
        isOpen={this.props.isOpen}
        onRequestClose={this.closeModal}
        className="sketches-image-modal"
        overlayClassName="profile-image-overlay"
        ariaHideApp={false}
      >
        <Container>
          <div className="sketches-modal-header d-flex align-items-center">
            <h1>Choose a thumbnail</h1>
            <div className="sketches-modal-header-thumbnail-container">{thumbnailPreview}</div>
          </div>
          <hr />
          <div className="sketches-gallery">{icons}</div>
          <br />
          <div className="text-center text-danger">{this.state.error || <br />}</div>
          <hr />
          <Row>
            <Col>
              <Button
                color="secondary"
                onClick={this.onBack}
                disabled={this.state.disableSubmit}
                size="lg"
                block
              >
                Back
              </Button>
            </Col>
            <Col>
              <Button
                color="success"
                onClick={this.onSecondSubmit}
                size="lg"
                disabled={this.badThumbnailInput() || this.state.disableSubmit}
                block
              >
                Create
              </Button>
            </Col>
          </Row>
        </Container>
      </ReactModal>
    );
  };

  renderFirstModal = () => {
    return (
      <ReactModal
        isOpen={this.props.isOpen}
        onRequestClose={this.closeModal}
        className="sketches-modal"
        overlayClassName="profile-image-overlay"
        ariaHideApp={false}
      >
        <Container>
          <h1 className="text-center">Create a Class</h1>
          <hr />
          <FormGroup row>
            <Label className="text-right" for="sketch-name" xs={4}>
              Name
            </Label>
            <Col xs={8}>
              <Input
                className="sketches-modal-input"
                onChange={e => this.setState({ name: e.target.value })}
                value={this.state.name}
                id="sketch-name"
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
              <Button color="success" onClick={this.onFirstSubmit} size="lg" block>
                Next
              </Button>
            </Col>
          </Row>
        </Container>
      </ReactModal>
    );
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/editor" />;
    }

    if (this.state.next) {
      return this.renderSecondModal();
    }

    return this.renderFirstModal();
  }
}

export default CreateClassModal;
