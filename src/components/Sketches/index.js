import React from "react";
import { Redirect } from "react-router-dom";
import SketchesButton from "./components/SketchesButton";
import DropdownButton from "./components/DropdownButton";
import ReactModal from "react-modal";
import { SketchThumbnailArray } from "./constants";
import "../../styles/Sketches.css";

const MAX_SKETCHES_PER_ROW = 5;

class Sketches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectTo: "",
      createSketchModalOpen: false,
      createSketchModalNext: false,
      createSketchLanguage: { display: "Python", value: "python" },
      createSketchName: "",
      createSketchThumbnail: "",
    };

    this.createSketch = {
      language: "",
      name: "",
      thumbnail: "",
    };
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

  getRandomSketchThumbnail = () =>
    SketchThumbnailArray[Math.floor(Math.random() * SketchThumbnailArray.length)];

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

  closeModal = () => {
    this.setState({
      createSketchModalOpen: false,
      createSketchModalNext: false,
      createSketchLanguage: "",
      createSketchName: "",
      createSketchThumbnail: "",
    });
  };

  renderSketches = () => {
    let sketches = [];
    this.props.listOfPrograms.forEach(({ name, language }) => {
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
            src={this.mapLanguageToThumbnail(language)}
            className="sketch-thumbnail"
          />
          <span>{name}</span>
        </div>,
      );
    });

    let rows = [];

    for (var i = 0; i < sketches.length / MAX_SKETCHES_PER_ROW; i++) {
      rows.push(
        <div className="sketches-grid-row" key={i}>
          {sketches.splice(i * MAX_SKETCHES_PER_ROW, MAX_SKETCHES_PER_ROW)}
        </div>,
      );
    }

    //<div className="sketches-grid-row"></div>

    return <div className="sketches-grid">{rows}</div>;
  };

  badThumbnailInputs = () => {
    if (
      !this.state.createSketchThumbnail ||
      SketchThumbnailArray.find(element => element === this.state.createSketchThumbnail) ===
        undefined
    ) {
      return true;
    }

    return false;
  };

  renderNextModal = () => {
    let icons = SketchThumbnailArray.map(val => {
      return (
        <figure
          className="sketches-gallery-item"
          key={val}
          onClick={() => this.setState({ createSketchThumbnail: val })}
        >
          <img
            src={`img/sketch-thumbnails/${val}.svg`}
            className={
              "sketches-gallery-img" + (this.state.createSketchThumbnail === val ? "-selected" : "")
            }
            alt="icon"
          />
        </figure>
      );
    });
    return (
      <ReactModal
        isOpen={this.state.createSketchModalOpen}
        onRequestClose={this.closeModal}
        className="sketches-image-modal"
        overlayClassName="profile-image-overlay"
        ariaHideApp={false}
      >
        <form className="sketches-modal-form">
          <h1 className="sketches-modal-header-text">Choose a thumbnail</h1>

          <div className="sketches-gallery">{icons}</div>
          <button onClick={() => console.log("hye")} disabled={this.badThumbnailInputs()}>
            Create Sketch
          </button>
        </form>
      </ReactModal>
    );
  };

  badNameOrLanguageInputs = () => {
    if (
      !this.state.createSketchName ||
      !this.state.createSketchLanguage ||
      this.state.createSketchName.length > 15
    ) {
      return true;
    }

    return false;
  };

  renderModal = () => {
    if (this.state.createSketchModalNext) {
      return this.renderNextModal();
    }

    return (
      <ReactModal
        isOpen={this.state.createSketchModalOpen}
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
            onChange={e => this.setState({ createSketchName: e.target.value })}
          />
          Language
          <DropdownButton
            dropdownItems={[
              { display: "HTML", value: "html" },
              { display: "Processing", value: "processing" },
              { display: "Python", value: "python" },
            ]}
            onSelect={lang => {
              this.setState({ createSketchLanguage: lang });
            }}
            displayValue={this.state.createSketchLanguage.display || "Python"}
          />
          <br />
          <button
            className="sketches-bottom-modal-button"
            onClick={() => this.setState({ createSketchModalNext: true })}
            disabled={this.badNameOrLanguageInputs()}
          >
            Next
          </button>
        </form>
      </ReactModal>
    );
  };

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
