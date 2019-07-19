import React from "react";
import ReactModal from "react-modal";
import { Button } from "reactstrap";
import DropdownButton from "./DropdownButton";
import { SketchThumbnailArray, LanguageDropdownValues } from "../constants";
import { Container, Row, Col, FormGroup, Label, Input } from "reactstrap";
import * as fetch from "../../../lib/fetch.js";

class EditSketchModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newLanguage: -1,
      newName: -1,
      newThumbnail: -1,
      disableSubmit: false,
      error: "",
      onThumbnails: false,
    };
  }
  componentWillMount() {}
  componentDidUpdate() {}

  closeModal = () => {
    if (this.props.onClose && {}.toString.call(this.props.onClose) === "[object Function]") {
      this.props.onClose();
    }
    this.setState({
      newLanguage: -1,
      newName: -1,
      newThumbnail: -1,
      error: "",
      onThumbnails: false,
      disableSubmit: false,
    });
  };

  // Next two bad____input are copied (and slightly modified) from create sketch modal

  badNameInput = () => {
    if (this.state.newName === -1) {
      return false;
    }
    if (!this.state.newName) {
      this.setState({ error: "Name is required" });
      return true;
    }
    if (this.state.newName.length > 15) {
      this.setState({ error: "Name must be 15 characters or less" });
      return true;
    }
    return false;
  };

  badLanguageInput = () => {
    if (this.state.newLanguage === -1) {
      return false;
    }
    if (!this.state.newLanguage) {
      this.setState({ error: "Please select a language" });
      return true;
    }

    let notFound = true;
    for (var i = 0; i < LanguageDropdownValues.length; i++) {
      if (
        this.state.newLanguage.display === LanguageDropdownValues[i].display &&
        this.state.newLanguage.value === LanguageDropdownValues[i].value
      ) {
        notFound = false;
        break;
      }
    }
    if (notFound) {
      this.setState({ error: "Invalid language selected" });
      return true;
    }

    return false;
  };

  handleSubmitEdit = async e => {
    e.preventDefault();

    if (this.badNameInput() || this.badLanguageInput()) {
      // note it's impossible to have a bad thumbnail input
      return;
    }

    let data = {};
    let doUpdate = false;

    if (this.state.newLanguage !== -1) {
      data.language = this.state.newLanguage.value;
      doUpdate = true;
    }
    if (this.state.newName !== -1) {
      data["name"] = this.state.newName;
      doUpdate = true;
    }
    if (this.state.newThumbnail !== -1) {
      data["thumbnail"] = this.state.newThumbnail;
      doUpdate = true;
    }
    if (doUpdate) {
      let updateData = {};
      updateData[this.props.sketchKey] = data;
      try {
        fetch
          .updatePrograms(this.props.uid, updateData)
          .then(res => {
            return res.json();
          })
          .then(json => {
            if (!json.ok) {
              this.setState({
                disableSubmit: false,
                error: json.error || "Failed to edit sketch, please try again later",
              });
              return;
            }
            if (this.state.newLanguage !== -1) {
              this.props.setProgramLanguage(this.props.sketchKey, this.state.newLanguage.value);
            }
            if (this.state.newName !== -1) {
              this.props.setProgramName(this.props.sketchKey, this.state.newName);
            }
            if (this.state.newThumbnail !== -1) {
              this.props.setProgramThumbnail(this.props.sketchKey, this.state.newThumbnail);
            }
            this.closeModal();
          })
          .catch(err => {
            this.setState({
              disableSubmit: false,
              error: "Failed to edit sketch, please try again later",
            });
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
      this.setState({ disableSubmit: true, error: "" });
    } else {
      this.closeModal();
    }
  };

  renderMainModal() {
    let thumbnailPreview = (
      <img
        src={`${process.env.PUBLIC_URL}/img/sketch-thumbnails/${
          this.state.newThumbnail !== -1
            ? SketchThumbnailArray[this.state.newThumbnail]
            : this.props.sketchImg
        }.svg`}
        className={"sketches-modal-header-thumbnail"}
        alt="icon"
      />
    );
    return (
      <ReactModal
        isOpen={this.props.isOpen}
        onRequestClose={this.closeModal}
        className="sketches-modal"
        overlayClassName="profile-image-overlay"
        ariaHideApp={false}
      >
        <Container>
          <h2 className="text-center">Editing "{this.props.sketchName}"</h2>
          <hr />
          <FormGroup row>
            <Label className="text-right" for="sketch-name" xs={4}>
              Name
            </Label>
            <Col xs={8}>
              <Input
                className="sketches-modal-input"
                onChange={e => this.setState({ newName: e.target.value })}
                value={this.state.newName !== -1 ? this.state.newName : this.props.sketchName}
                id="sketch-name"
              />
            </Col>
          </FormGroup>
          <br />
          <Row>
            <Col xs="4" className="text-right">
              Language
            </Col>
            <Col xs="8" className="d-flex align-items-center">
              <DropdownButton
                dropdownItems={LanguageDropdownValues}
                onSelect={lang => this.setState({ newLanguage: lang })}
                displayValue={
                  this.state.newLanguage !== -1
                    ? this.state.newLanguage.display
                    : this.props.sketchLang
                }
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col xs="4" className="text-right">
              <div
                className="sketches-modal-header-thumbnail-container"
                style={{ display: "block", marginLeft: "auto", marginRight: "0" }}
              >
                {thumbnailPreview}
              </div>
            </Col>
            <Col xs="8" className="d-flex align-items-center">
              <Button
                color="primary"
                size="lg"
                onClick={() => {
                  this.setState({ onThumbnails: true });
                }}
              >
                Change
              </Button>
            </Col>
          </Row>
          <br />
          <div className="text-center text-danger">{this.state.error || <br />}</div>
          <hr />
          <Row>
            <Col>
              <Button
                color="danger"
                onClick={this.closeModal}
                size="lg"
                disabled={this.state.disableSubmit}
                block
              >
                Cancel
              </Button>
            </Col>
            <Col>
              <Button
                color="success"
                onClick={this.handleSubmitEdit}
                size="lg"
                disabled={this.state.disableSubmit}
                block
              >
                Confirm
              </Button>
            </Col>
          </Row>
        </Container>
      </ReactModal>
    );
  }

  renderThumbnailModal() {
    let icons = SketchThumbnailArray.map((val, index) => {
      return (
        <figure
          className="sketches-gallery-item"
          key={val}
          onClick={() => this.setState({ newThumbnail: index })}
        >
          <img
            src={`${process.env.PUBLIC_URL}/img/sketch-thumbnails/${val}.svg`}
            className={
              "sketches-gallery-img" + (this.state.newThumbnail === index ? "-selected" : "")
            }
            alt="icon"
          />
        </figure>
      );
    });

    let thumbnailPreview =
      this.state.newThumbnail !== -1 ? (
        <img
          src={`${process.env.PUBLIC_URL}/img/sketch-thumbnails/${
            SketchThumbnailArray[this.state.newThumbnail]
          }.svg`}
          className={"sketches-modal-header-thumbnail"}
          alt="icon"
        />
      ) : (
        <img
          src={`${process.env.PUBLIC_URL}/img/sketch-thumbnails/${this.props.sketchImg}.svg`}
          className={"sketches-modal-header-thumbnail"}
          alt="icon"
        />
      );
    return (
      <ReactModal
        isOpen={this.props.isOpen}
        onRequestClose={this.closeModal}
        className="sketches-modal"
        overlayClassName="profile-image-overlay"
        ariaHideApp={false}
      >
        <form>
          <div className="sketches-modal-header d-flex align-items-center">
            <h1>Choose a thumbnail</h1>
            <div className="ml-4 sketches-modal-header-thumbnail-container">{thumbnailPreview}</div>
          </div>
          <hr />
          <div className="sketches-gallery">{icons}</div>
          <div style={{ color: "red", textAlign: "center" }}>{this.state.error || <br />}</div>
        </form>
        <hr />
        <Button
          color="secondary"
          onClick={() => {
            this.setState({ onThumbnails: false });
          }}
          size="lg"
          block
        >
          Back
        </Button>{" "}
      </ReactModal>
    );
  }

  render() {
    if (this.state.onThumbnails) {
      return this.renderThumbnailModal();
    }

    return this.renderMainModal();
  }
}

export default EditSketchModal;
