import React from "react";
import ReactModal from "react-modal";
import { Button } from "reactstrap";
import { Redirect } from "react-router-dom";
import DropdownButton from "./DropdownButton";
import { SketchThumbnailArray, LanguageDropdownValues } from "../constants";

class EditSketchModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newLanguage: -1,
      newName: -1,
      newThumbnail: -1,
      spinner: false,
      error: "",
      onThumbnails: false,
      redirect: false,
    };
    console.log(LanguageDropdownValues);
  }
  componentWillMount() {}
  componentDidUpdate() {}

  closeModal = () => {
    if (this.props.onClose && {}.toString.call(this.props.onClose) === "[object Function]") {
      this.props.onClose();
    }
    this.setState({
      next: false,
      newLanguage: -1,
      newName: -1,
      newThumbnail: -1,
      error: "",
      onThumbnails: false,
      spinner: false,
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
    // if( this.state.name.match(/[^a-zA-Z0-9!@#$%'" .]/)){
    //   this.setState({error: "Sketch name nust be less than 20 characters"})
    //   return true
    // }

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

  onFormSubmit = async e => {
    e.preventDefault();

    if (this.badNameInput() || this.badLanguageInput()) {
      // note it's impossible to have a bad thumbnail input
      return;
    }

    let data = {};

    if (this.state.newLanguage !== -1) {
      data["language"] = this.state.newLanguage.value;
    }
    if (this.state.newName !== -1) {
      data["name"] = this.state.newName;
    }
    if (this.state.newThumbnail !== -1) {
      data["thumbnail"] = this.state.newThumbnail;
    }
    if (!(Object.keys(data).length === 0 && data.constructor === Object)) {
      try {
        fetch
          .updatePrograms(this.props.uid, data)
          .then(res => {
            return res.json();
          })
          .then(json => {
            if (!json.ok) {
              this.setState({
                spinner: false,
                error: json.error || "Failed to create sketch, please try again later",
              });
              return;
            }
            this.props.addProgram(this.state.name, json.data || {}); // update this!
            this.setState({ redirect: true });
            this.closeModal();
          })
          .catch(err => {
            this.setState({
              spinner: false,
              error: "Failed to create sketch, please try again later",
            });
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
      this.setState({ spinner: true, error: "" });
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
            onSelect={lang => this.setState({ newLanguage: lang })}
            displayValue={
              this.state.newLanguage !== -1
                ? this.state.newLanguage.display
                : this.props
                    .sketchLang /*LanguageDropdownValues[LanguageDropdownValues.indexOf(this.props.sketchLang)].display*/
            }
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
