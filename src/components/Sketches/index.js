import React from "react";
import { Redirect } from "react-router-dom";
import SketchesButton from "./components/SketchesButton";
import SketchBox from "./components/SketchBox";
import ConfirmDeleteModalContainer from "./containers/ConfirmDeleteModalContainer";
import CreateSketchModalContainer from "./containers/CreateSketchModalContainer";
import EditSketchModalContainer from "./containers/EditSketchModalContainer";
import OpenPanelButtonContainer from "../common/containers/OpenPanelButtonContainer";
import { SketchThumbnailArray } from "./constants";
// import { PANEL_SIZE } from "../../constants";
import "../../styles/Sketches.css";

import { faCogs } from "@fortawesome/free-solid-svg-icons";
import { faPython } from "@fortawesome/free-brands-svg-icons";
import { faHtml5 } from "@fortawesome/free-brands-svg-icons";

const ROW_PADDING = 100;
const SKETCH_WIDTH = 170;

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

  getRandomSketchThumbnail = () => {
    return SketchThumbnailArray[Math.floor(Math.random() * SketchThumbnailArray.length)];
  };

  setCreateSketchModalOpen = val => {
    this.setState({ createSketchModalOpen: val });
  };

  setConfirmDeleteModalOpen = (val, sketch) => {
    this.setState({ confirmDeleteModalOpen: val, selectedSketch: sketch });
  };

  setEditSketchModalOpen = (val, sketch, img) => {
    this.setState({ editSketchModalOpen: val, selectedSketch: sketch, selectedImg: img });
  };

  redirectToEditor = name => {
    this.props.setMostRecentProgram(name);
    this.setState({ redirectTo: "/editor" });
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
      let faLanguage;
      switch (language) {
        case "python":
          faLanguage = faPython;
          break;
        case "processing":
          faLanguage = faCogs;
          break;
        case "html":
        default:
          faLanguage = faHtml5;
      }
      sketches.push(
        <SketchBox
          img={this.getThumbnailSrc(thumbnail)}
          icon={faLanguage}
          name={name}
          key={name}
          deleteFunc={() => {
            this.setConfirmDeleteModalOpen(true, name);
          }}
          editFunc={() => {
            this.setEditSketchModalOpen(true, name, this.getThumbnailSrc(thumbnail));
          }}
          redirFunc={() => {
            this.redirectToEditor(name);
          }}
        />,
      );
    });
    console.log(
      this.props.viewSize,
      Math.floor((this.props.viewSize - ROW_PADDING) / SKETCH_WIDTH),
    );
    let numSketchesPerRow = Math.floor((this.props.viewSize - ROW_PADDING) / SKETCH_WIDTH);
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

  renderConfirmDeleteModal = () => (
    <ConfirmDeleteModalContainer
      isOpen={this.state.confirmDeleteModalOpen}
      onClose={() => this.setConfirmDeleteModalOpen(false)}
      sketchName={this.state.selectedSketch}
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
    />
  );

  renderContent = () => {
    return (
      <div>
        {this.renderHeader()}
        {this.renderSketches()}
        {this.renderCreateSketchModal()}
        {this.renderConfirmDeleteModal()}
        {this.renderEditSketchModal()}
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
