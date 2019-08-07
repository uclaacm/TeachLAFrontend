import React from "react";
import { Redirect } from "react-router-dom";
import SketchBox from "./components/SketchBox";
import ConfirmDeleteModalContainer from "./containers/ConfirmDeleteModalContainer";
import CreateSketchModalContainer from "./containers/CreateSketchModalContainer";
import EditSketchModalContainer from "./containers/EditSketchModalContainer";
import OpenPanelButtonContainer from "../common/containers/OpenPanelButtonContainer";
import { SketchThumbnailArray } from "./constants";
import ProcessingConstructor from "../Editor/components/Output/Processing";
// import { PANEL_SIZE } from "../../constants";
import "../../styles/Sketches.css";

import { Button } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCogs } from "@fortawesome/free-solid-svg-icons";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { faPython } from "@fortawesome/free-brands-svg-icons";
import { faHtml5 } from "@fortawesome/free-brands-svg-icons";

const ROW_PADDING = 100;
const SKETCH_WIDTH = 220;

class Sketches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectTo: "",
      confirmDeleteModalOpen: false,
      createSketchModalOpen: false,
      editSketchModalOpen: false,
      selectedSketch: "",
      selectedImg: "",
      selectedLang: "",
      selectedKey: "",
    };
  }

  getRandomSketchThumbnail = () => {
    return SketchThumbnailArray[Math.floor(Math.random() * SketchThumbnailArray.length)];
  };

  downloadSketchCode = (name, language, code) => {
    let extension = ".";
    switch (language) {
      case "python":
        extension += "py";
        break;
      case "processing": // this is because we construct the processing result as an HTML file. jank.
      case "html":
        extension += "html";
        break;
      default:
        extension += "txt";
    }
    // taken from this: https://stackoverflow.com/questions/44656610/download-a-string-as-txt-file-in-react
    const element = document.createElement("a");
    let file;
    if (language === "processing") {
      file = new Blob([ProcessingConstructor(code, true)], { type: "text/plain" });
    } else {
      file = new Blob([code], { type: "text/plain" });
    }
    element.href = URL.createObjectURL(file);
    element.download = name + extension;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  setCreateSketchModalOpen = val => {
    this.setState({ createSketchModalOpen: val });
  };

  setConfirmDeleteModalOpen = (val, sketch, key) => {
    this.setState({ confirmDeleteModalOpen: val, selectedSketch: sketch, selectedKey: key });
  };

  setEditSketchModalOpen = (val, sketch, img, lang, key) => {
    this.setState({
      editSketchModalOpen: val,
      selectedSketch: sketch,
      selectedImg: img,
      selectedLang: lang,
      selectedKey: key,
    });
  };

  redirectToEditor = name => {
    this.props.setMostRecentProgram(name);
    this.setState({ redirectTo: "/editor" });
  };

  renderHeader = () => (
    <div className="sketches-header">
      <OpenPanelButtonContainer />
      <div className="sketches-header-text">Sketches</div>
      <Button
        className="ml-auto mr-2"
        color="success"
        size="lg"
        onClick={() => this.setCreateSketchModalOpen(true)}
      >
        <FontAwesomeIcon icon={faFile} /> Create Sketch
      </Button>
    </div>
  );

  getThumbnailSrc = val => {
    if (val === undefined || val === "" || val >= SketchThumbnailArray.length || val < 0) {
      return SketchThumbnailArray[0];
    }
    return SketchThumbnailArray[val];
  };

  renderSketches = () => {
    let newList = this.props.programs.concat([]);
    if (newList.size === 0) {
      return (
        <div>
          <div className="no-sketches-container">
            <h2>There's nothing here! Why don't you try creating a sketch?</h2>
            <br />
            <p>
              <Button color="success" size="lg" onClick={() => this.setCreateSketchModalOpen(true)}>
                Create A Sketch
              </Button>
            </p>
          </div>
        </div>
      );
    }
    let sketches = [];
    newList.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name === b.name) return 0;
      // if (a.name > b.name) return 1;
      else return 1;
    });
    newList.forEach(({ key, name, language, thumbnail, code }) => {
      let faLanguage;
      let languageDisplay; // not a great way to do this!
      switch (language) {
        case "python":
          faLanguage = faPython;
          languageDisplay = "Python";
          break;
        case "processing":
          faLanguage = faCogs;
          languageDisplay = "Processing";
          break;
        case "html":
        default:
          faLanguage = faHtml5;
          languageDisplay = "HTML";
      }
      sketches.push(
        <SketchBox
          img={this.getThumbnailSrc(thumbnail)}
          icon={faLanguage}
          name={name}
          key={key}
          deleteFunc={() => {
            this.setConfirmDeleteModalOpen(true, name, key);
          }}
          downloadFunc={() => {
            this.downloadSketchCode(name, language, code);
          }}
          editFunc={() => {
            this.setEditSketchModalOpen(
              true,
              name,
              this.getThumbnailSrc(thumbnail),
              languageDisplay,
              key,
            );
          }}
          redirFunc={() => {
            this.redirectToEditor(key);
          }}
        />,
      );
    });
    let numSketchesPerRow = Math.floor((this.props.calculatedWidth - ROW_PADDING) / SKETCH_WIDTH);
    let rows = [];
    let originalLength = sketches.length;
    for (let i = 0; i < originalLength / numSketchesPerRow; i++) {
      rows.push(
        <div className="sketches-grid-row" key={i}>
          {sketches.splice(0, numSketchesPerRow)}
        </div>,
      );
    }

    return <div className="sketches-grid">{rows}</div>;
  };

  renderConfirmDeleteModal = () => (
    <ConfirmDeleteModalContainer
      isOpen={this.state.confirmDeleteModalOpen}
      onClose={() => this.setConfirmDeleteModalOpen(false)}
      sketchName={this.state.selectedSketch}
      sketchKey={this.state.selectedKey}
    />
  );

  renderCreateSketchModal = () => (
    <CreateSketchModalContainer
      isOpen={this.state.createSketchModalOpen}
      onClose={() => this.setCreateSketchModalOpen(false)}
    />
  );

  renderEditSketchModal = () => (
    <EditSketchModalContainer
      isOpen={this.state.editSketchModalOpen}
      onClose={() => this.setEditSketchModalOpen(false)}
      sketchName={this.state.selectedSketch}
      sketchImg={this.state.selectedImg}
      sketchLang={this.state.selectedLang}
      sketchKey={this.state.selectedKey}
    />
  );

  renderContent = () => {
    return (
      <React.Fragment>
        {this.renderHeader()}
        {this.renderSketches()}
        {this.renderCreateSketchModal()}
        {this.renderConfirmDeleteModal()}
        {this.renderEditSketchModal()}
      </React.Fragment>
    );
  };

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo} />;
    }

    const containerStyle = {
      left: this.props.left || 0,
      width: this.props.calculatedWidth,
      height: this.props.screenHeight,
    };

    return (
      <div className="sketches" style={containerStyle}>
        {this.renderContent()}
      </div>
    );
  }
}

export default Sketches;
