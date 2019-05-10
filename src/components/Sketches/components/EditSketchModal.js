import React from "react";
import ReactModal from "react-modal";
import { Button } from "reactstrap";
import { Redirect } from "react-router-dom";
import DropdownButton from "./DropdownButton";
import {
  SketchThumbnailArray,
  LanguageDropdownValues,
  LanguageDropdownDefault,
} from "../constants";

class EditSketchModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      language: LanguageDropdownDefault,
      newName: -1,
      newThumbnail: -1,
      spinner: false,
      error: "",
      onThumbnails: false,
      redirect: false,
    };
  }
  componentWillMount() {}
  componentDidUpdate() {}

  closeModal = () => {
    if (this.props.onClose && {}.toString.call(this.props.onClose) === "[object Function]") {
      this.props.onClose();
    }
  };

  renderMainModal() {
    console.log(this.props.sketchImg);
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
          alt="icodn"
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
        <h2 className="text-center">Editing "{this.props.sketchName}"</h2>
        <hr />
        <form className="sketches-modal-form">
          Name
          <input
            className="sketches-modal-input"
            onChange={e => this.setState({ newName: e.target.value })}
            value={this.state.newName !== -1 ? this.state.newName : this.props.sketchName}
          />
          Language
          <DropdownButton
            dropdownItems={LanguageDropdownValues}
            onSelect={lang => this.setState({ language: lang })}
            displayValue={this.state.language.display || LanguageDropdownDefault.display}
          />
          <br />
          <div className="sketches-modal-header-thumbnail-container">{thumbnailPreview}</div>
          <br />
          <Button
            color="primary"
            onClick={() => {
              this.setState({ onThumbnails: true });
            }}
          >
            Change Thumbnail
          </Button>
          <div style={{ color: "red", textAlign: "center" }}>{this.state.error || <br />}</div>
        </form>
        <hr />
        <Button color="danger" onClick={this.closeModal} size="lg" block>
          Cancel
        </Button>{" "}
        <Button color="success" size="lg" block>
          Confirm
        </Button>{" "}
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
        <form className="sketches-modal-form">
          <div className="sketches-modal-header">
            <h1>Choose a thumbnail</h1>
            <div className="sketches-modal-header-thumbnail-container">{thumbnailPreview}</div>
          </div>
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
    if (this.state.redirect) {
      return <Redirect to="/editor" />;
    }

    if (this.state.onThumbnails) {
      return this.renderThumbnailModal();
    }

    return this.renderMainModal();
  }
}

export default EditSketchModal;
