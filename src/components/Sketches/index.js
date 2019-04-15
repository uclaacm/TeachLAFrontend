import React from "react";
import { Redirect } from "react-router-dom";

/**------Props-------
 * textEditorSize: number? representing the percentage of space the left split pane takes up
 * togglePanel: function to call when you want the Profile Panel to disappear/reapper
 * panelOpen: boolean telling whether the Profile Panel is open or not
 * codeStyle: object used to style the whole container //TODO: rename or move this prop
 * hotReload: boolean telling if //TODO: figure out a better place for this/remove it
 */

const MAX_SKETCHES_PER_ROW = 5;

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectTo: "",
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

  renderHeader = () => (
    <div className="sketches-header">
      {this.renderOpenPanelButton()}
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

export default Main;
