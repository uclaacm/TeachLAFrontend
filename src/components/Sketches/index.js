import React from "react";
import { Redirect } from "react-router-dom";
import SketchesButton from "./components/SketchesButton";
import CreateSketchModalContainer from "./containers/CreateSketchModalContainer";
import OpenPanelButtonContainer from "../common/containers/OpenPanelButtonContainer";
import { SketchThumbnailArray } from "./constants";
// import { PANEL_SIZE } from "../../constants";
import "../../styles/Sketches.css";

const ROW_PADDING = 100;
const SKETCH_WIDTH = 170;

class Sketches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectTo: "",
      createSketchModalOpen: false,
    };

    // this.originalWidth = this.props.viewSize
  }

  //==============React Lifecycle Functions Start===================//
  componentWillMount() {}

  componentDidUpdate(prevProps) {}

  getRandomSketchThumbnail = () => {
    return SketchThumbnailArray[Math.floor(Math.random() * SketchThumbnailArray.length)];
  };

  setCreateSketchModalOpen = val => {
    this.setState({ createSketchModalOpen: val });
  };

  renderHeader = () => (
    <div className="sketches-header">
      <OpenPanelButtonContainer />
      <div className="sketches-header-text">Sketches</div>
      <div style={{ marginLeft: "auto" }}>
        <SketchesButton
          handleClick={() => this.setCreateSketchModalOpen(true)}
          text={"Create Sketch"}
          width={"200px"}
        />
      </div>
    </div>
  );

  mapLanguageToThumbnail = lang => {
    switch (lang) {
      case "python":
        return `img/python.png`;
      case "processing":
        return "img/processing.png";
      case "html":
      default:
        return "img/html.png";
    }
  };

  getThumbnailSrc = val => {
    if (val === undefined || val === "" || val >= SketchThumbnailArray.length || val < 0) {
      return SketchThumbnailArray[0];
    }
    return SketchThumbnailArray[val];
  };

  renderSketches = () => {
    let newList = this.props.listOfPrograms.concat([]);
    let sketches = [];
    newList.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name === b.name) return 0;
      // if (a.name > b.name) return 1;
      else return 1;
    });

    newList.forEach(({ name, language, thumbnail }) => {
      sketches.push(
        <div
          key={name}
          className="sketch-box"
          onClick={() => {
            this.props.setMostRecentProgram(name);
            this.setState({ redirectTo: "/editor" });
          }}
        >
          <img
            alt={"" + language + "-icon"}
            src={`${process.env.PUBLIC_URL}/img/sketch-thumbnails/${this.getThumbnailSrc(
              thumbnail,
            )}.svg`}
            className="sketch-thumbnail"
          />
          <span>{name}</span>
        </div>,
      );
    });

    let numSketchesPerRow = Math.floor((this.props.calculatedWidth - ROW_PADDING) / SKETCH_WIDTH);
    // let numSketchesPerRow = (this.originalWidth - ROW_PADDING) / SKETCH_WIDTH
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

  renderModal = () => (
    <CreateSketchModalContainer
      isOpen={this.state.createSketchModalOpen}
      onClose={() => this.setCreateSketchModalOpen(false)}
    />
  );

  renderContent = () => {
    return (
      <React.Fragment>
        {this.renderHeader()}
        {this.renderSketches()}
        {this.renderModal()}
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
