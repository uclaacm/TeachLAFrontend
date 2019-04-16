import React from "react";
import { Redirect } from "react-router-dom";
import "../../styles/Sketches.css";

const MAX_SKETCHES_PER_ROW = 5;

class CreateSketchModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectTo: "",
    };
  }

  //==============React Lifecycle Functions Start===================//
  componentWillMount() {}

  componentDidUpdate() {}

  renderOpenPanelButton = () => {};

  renderHeader = () => (
    <div className="sketches-header">
      {this.renderOpenPanelButton()}
      <div className="sketches-header-text">Sketches</div>
      <div className="sketches-header-text">Sketches</div>
    </div>
  );

  mapLanguageToThumbnail = lang => {
    switch (lang) {
      case "python":
        return "img/python.png";
      case "processing":
        return "img/processing.png";
      case "html":
      default:
        return "img/html.png";
    }
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

  renderContent = () => {
    return (
      <div>
        {this.renderHeader()}
        {this.renderSketches()}
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
