import React from "react";
import SketchBox from "./components/SketchBox";
import ConfirmDeleteModalContainer from "./containers/ConfirmDeleteModalContainer";
import CreateSketchModalContainer from "./containers/CreateSketchModalContainer";
import EditSketchModalContainer from "./containers/EditSketchModalContainer";
import OpenPanelButtonContainer from "../common/containers/OpenPanelButtonContainer";
import { SketchThumbnailArray } from "./constants";
import CodeDownloader from "../../util/languages/CodeDownloader";
import "styles/Sketches.scss";

import { Button } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";

const ROW_PADDING = 100;
const SKETCH_WIDTH = 220;

class Sketches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

  setCreateSketchModalOpen = (val) => {
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

  setProgram = (name) => {
    this.props.setMostRecentProgram(name);
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

  getThumbnailSrc = (val) => {
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
      sketches.push(
        <SketchBox
          img={this.getThumbnailSrc(thumbnail)}
          icon={language.icon}
          name={name}
          key={key}
          deleteFunc={() => {
            this.setConfirmDeleteModalOpen(true, name, key);
          }}
          downloadFunc={() => {
            CodeDownloader.download(name, language, code);
          }}
          editFunc={() => {
            this.setEditSketchModalOpen(
              true,
              name,
              this.getThumbnailSrc(thumbnail),
              language.display,
              key,
            );
          }}
          redirFunc={() => {
            this.setProgram(key);
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
      onClose={() => this.setState({ confirmDeleteModalOpen: false })}
      sketchName={this.state.selectedSketch}
      sketchKey={this.state.selectedKey}
    />
  );

  renderCreateSketchModal = () => (
    <CreateSketchModalContainer
      isOpen={this.state.createSketchModalOpen}
      onClose={() => this.setState({ createSketchModalOpen: false })}
    />
  );

  renderEditSketchModal = () => (
    <EditSketchModalContainer
      isOpen={this.state.editSketchModalOpen}
      onClose={() => this.setState({ editSketchModalOpen: false })}
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
    const containerStyle = {
      width: this.props.calculatedWidth,
      height: this.props.screenHeight,
    };

    return (
      <div className="sketches-container" style={containerStyle}>
        {this.renderContent()}
      </div>
    );
  }
}

export default Sketches;
