import React from "react";
import ImageSelector from "../../common/ImageSelector";
import { ThumbnailArray } from "../../../constants";
import * as fetch from "../../../lib/fetch.js";
import { Redirect } from "react-router-dom";

import { Button, Container, Row, Col, FormGroup, Label, Input } from "reactstrap";

import ReactModal from "react-modal";

import "styles/SketchesModal.scss";

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

  setNext = (val) => {
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
      this.state.thumbnail >= ThumbnailArray.length ||
      this.state.thumbnail < 0
    ) {
      return true;
    }

    return false;
  };

  badNameInput = () => {
    if (!this.state.name) {
      this.setState({ error: "Name is required" });
      return true;
    }
    if (this.state.name.length > 100) {
      this.setState({ error: "Name must be 100 characters or less" });
      return true;
    }

    return false;
  };

  onFirstSubmit = (e) => {
    e.preventDefault();
    if (this.badNameInput()) {
      return;
    }
    this.setNext(true);
  };

  onSecondSubmit = async (e) => {
    e.preventDefault();

    if (this.badThumbnailInput()) return;

    let data = {
      uid: this.props.uid,
      thumbnail: this.state.thumbnail,
      name: this.state.name,
    };
    console.log("about to try creating class, data is " + JSON.stringify(data));
    try {
      fetch
        .createClass(data)
        .then((res) => {
          if (!res.ok) throw new Error(`Failed to create class! Got status ${res.status}`);
          return res.json();
        })
        .then((json) => {
          console.log(JSON.stringify(json));
          this.props.addInstrClass(json.cid, json || {});
          this.setState({ redirect: true });
          this.closeModal();
        })
        .catch((err) => {
          console.log("caught an error");
          this.setState({
            disableSubmit: false,
            error: "Failed to create class, please try again later",
          });
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }

    // Testing stuff (do this instead of the try-catch block):
    /*
    let testCid = Math.floor(Math.random() * 10);
    this.props.addInstrClass(testCid,
      {
        thumbnail: this.state.thumbnail,
        name: this.state.name,
        creator: this.props.uid,
        instructors: [ "Me", this.props.uid ],
        members: [ "HASH3", "HASH4", "HASH5" ],
        programs: [ "HASH6", "HASH7" ],
        cid: testCid,
        wid: "Metallic Funky Monkey",
      });
    this.closeModal();
*/
    // end of testing stuff

    this.setState({ disableSubmit: true, error: "" });
  };

  renderSecondModal = () => {
    let icons = ThumbnailArray.map((val, index) => {
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
            ThumbnailArray[this.state.thumbnail]
          }.svg`}
          className={"sketches-modal-header-thumbnail"}
          alt="icon"
        />
      ) : null;
    return (
      <ImageSelector
        isOpen={this.props.isOpen}
        closeModal={this.closeModal}
        thumbnailPreview={thumbnailPreview}
        icons={icons}
        error={this.state.error}
      >
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
      </ImageSelector>
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
            <Label className="text-right" for="class-name" xs={4}>
              Enter new class name:
            </Label>
            <Col xs={8}>
              <Input
                onChange={(e) => this.setState({ name: e.target.value })}
                value={this.state.name}
                id="class-name"
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
      // put class url here
      return <Redirect to="/class" />;
    }

    if (this.state.next) {
      return this.renderSecondModal();
    }

    return this.renderFirstModal();
  }
}

export default CreateClassModal;
