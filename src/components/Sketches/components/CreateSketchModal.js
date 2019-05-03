import React from "react";
import DropdownButton from "./DropdownButton";
import {
  SketchThumbnailArray,
  LanguageDropdownValues,
  LanguageDropdownDefault,
} from "../constants";
import { RingLoader } from "react-spinners";
import * as fetch from "../../../lib/fetch.js";
import { Redirect } from "react-router-dom";

import ReactModal from "react-modal";

class CreateSketchModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      language: LanguageDropdownDefault,
      name: "",
      next: false,
      thumbnail: -1,
      spinner: false,
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
      language: LanguageDropdownDefault,
      name: "",
      thumbnail: -1,
      error: "",
      spinner: false,
    });
  };

  setNext = val => {
    this.setState({
      next: val,
      error: "",
      spinner: false,
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
    // if( this.state.name.match(/[^a-zA-Z0-9!@#$%'" .]/)){
    //   this.setState({error: "Sketch name nust be less than 20 characters"})
    //   return true
    // }

    return false;
  };

  badLanguageInput = () => {
    if (!this.state.language) {
      this.setState({ error: "Please select a language" });
      return true;
    }

    let notFound = true;
    for (var i = 0; i < LanguageDropdownValues.length; i++) {
      if (
        this.state.language.display === LanguageDropdownValues[i].display &&
        this.state.language.value === LanguageDropdownValues[i].value
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

  onFirstSubmit = e => {
    e.preventDefault();
    if (this.badNameInput() || this.badLanguageInput()) {
      return;
    }
    this.setNext(true);
  };

  onSecondSubmit = async e => {
    e.preventDefault();

    if (this.badThumbnailInput()) return;

    // let data = {}
    // data[this.state.name] = {
    //   thumbnail: this.state.thumbnail,
    //   language: this.state.language.value,
    //   code: "",
    // }
    let data = {
      uid: this.props.uid,
      thumbnail: this.state.thumbnail,
      language: this.state.language.value,
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
              spinner: false,
              error: json.error || "Failed to create sketch, please try again later",
            });
            return;
          }
          this.props.addProgram(this.state.name, json.data || {});
          this.props.setMostRecentProgram(this.state.name);
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
  };

  renderSecondButtonClump = () => {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          width: "150px",
        }}
      >
        <button style={{ width: "60px" }} onClick={this.onBack} disabled={this.state.spinner}>
          Back
        </button>
        {this.state.spinner ? (
          <div className="sketches-form-spinner" style={{ width: "60px" }}>
            <RingLoader color={"#171124"} size={30} loading={this.state.spinner} />
          </div>
        ) : (
          <button
            style={{ width: "60px" }}
            onClick={this.onSecondSubmit}
            disabled={this.badThumbnailInput()}
          >
            Create
          </button>
        )}
      </div>
    );
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
        <form className="sketches-modal-form">
          <div className="sketches-modal-header">
            <h1>Choose a thumbnail</h1>
            <div className="sketches-modal-header-thumbnail-container">{thumbnailPreview}</div>
          </div>
          <div className="sketches-gallery">{icons}</div>
          <div style={{ color: "red", textAlign: "center" }}>{this.state.error || <br />}</div>
          {this.renderSecondButtonClump()}
        </form>
      </ReactModal>
    );
  };

  renderFirstButtonClump = () => {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          width: "150px",
        }}
      >
        <button style={{ width: "60px" }} onClick={this.closeModal}>
          Cancel
        </button>
        <button
          style={{ width: "60px" }}
          className="sketches-bottom-modal-button"
          onClick={this.onFirstSubmit}
        >
          Next
        </button>
      </div>
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
        <form className="sketches-modal-form">
          <h1 className="sketches-modal-header-text">Create a Sketch</h1>
          Name
          <input
            className="sketches-modal-input"
            onChange={e => this.setState({ name: e.target.value })}
            value={this.state.name}
          />
          Language
          <DropdownButton
            dropdownItems={LanguageDropdownValues}
            onSelect={lang => this.setState({ language: lang })}
            displayValue={this.state.language.display || LanguageDropdownDefault.display}
          />
          <div style={{ color: "red", textAlign: "center" }}>{this.state.error || <br />}</div>
          {this.renderFirstButtonClump()}
        </form>
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

export default CreateSketchModal;
