import React from "react";
import { Redirect } from "react-router-dom";
import SketchesButton from "./components/SketchesButton";
import CreateSketchModalContainer from "./containers/CreateSketchModalContainer";
import { SketchThumbnailArray } from "./constants";
// import { PANEL_SIZE } from "../../constants";
import "../../styles/Sketches.css";

const ROW_PADDING = 100;
const SKETCH_WIDTH = 150;

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
  componentWillMount() {
    // if (this.props.screenWidth <= EDITOR_WIDTH_BREAKPOINT) {
    //   this.setState({ viewMode: CODE_ONLY });
    // }
  }

  componentDidUpdate(prevProps) {
    // if (this.props.screenWidth !== prevProps.screenWidth) {
    //   if (this.props.screenWidth <= EDITOR_WIDTH_BREAKPOINT) {
    //     if (this.state.viewMode === CODE_AND_OUTPUT) {
    //       this.setState({ viewMode: CODE_ONLY });
    //     }
    //   }
    // }
    // if (Math.abs(this.props.viewSize - this.originalWidth) >= (PANEL_SIZE - 10)) {
    //   console.log(this.props.viewSize, this.originalWidth)
    //   this.originalWidth = this.props.viewSize
    // }
  }

  renderOpenPanelButton = () => {
    const { panelOpen, togglePanel } = this.props;

    //if the left panel is closed, show an empty div
    if (panelOpen) {
      return <div className="sketches-expand-panel-arrow" />;
    }

    // otherwise show a > that when clicked, opens the panel
    return (
      <div className="sketches-expand-panel-arrow" title="Open Profile Panel" onClick={togglePanel}>
        >
      </div>
    );
  };

  getRandomSketchThumbnail = () => {
    return SketchThumbnailArray[Math.floor(Math.random() * SketchThumbnailArray.length)];
  };

  setCreateSketchModalOpen = val => {
    this.setState({ createSketchModalOpen: val });
  };

  renderHeader = () => (
    <div className="sketches-header">
      {this.renderOpenPanelButton()}
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
            src={`img/sketch-thumbnails/${this.getThumbnailSrc(thumbnail)}.svg`}
            className="sketch-thumbnail"
          />
          <span>{name}</span>
        </div>,
      );
    });

    let numSketchesPerRow = (this.props.viewSize - ROW_PADDING) / SKETCH_WIDTH - 1;
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

    //<div className="sketches-grid-row"></div>

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
      <div>
        {this.renderHeader()}
        {this.renderSketches()}
        {this.renderModal()}
      </div>
    );
  };

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo} />;
    }
    return <div style={this.props.codeStyle}>{this.renderContent()}</div>;
  }
}

export default Sketches;
