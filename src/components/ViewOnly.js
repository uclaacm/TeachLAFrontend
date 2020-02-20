import React from "react";
import SplitPane from "react-split-pane";
import OutputContainer from "./Output/OutputContainer.js";
import TextEditorContainer from "./TextEditor/containers/TextEditorContainer.js";
import * as fetch from "../lib/fetch.js";
import * as cookies from "../lib/cookies.js";
import SketchesPageContainer from "./Sketches/containers/SketchesContainer";
import "styles/Main.scss";
import ProfilePanelContainer from "./common/containers/ProfilePanelContainer";

import { Redirect } from "react-router-dom";
import { EDITOR_WIDTH_BREAKPOINT, CODE_AND_OUTPUT, CODE_ONLY, OUTPUT_ONLY } from "../constants";
import CodeDownloader from "../util/languages/CodeDownloader";

import { PANEL_SIZE } from "../constants";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/theme/duotone-light.css";
import "styles/CustomCM.scss";
import "styles/Resizer.scss";
import "styles/Editor.scss";

/**------Props-------
 * togglePanel: function to call when you want the Profile Panel to disappear/reapper
 * panelOpen: boolean telling whether the Profile Panel is open or not
 * left: the left css property that should be applied on the top level element
 */

class ViewOnly extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewMode: this.props.screenWidth <= EDITOR_WIDTH_BREAKPOINT ? CODE_ONLY : CODE_AND_OUTPUT,
      pane1Style: { transition: "width .5s ease" },
      theme: cookies.getThemeFromCookie(),
      programID: "",
      sketchName: "",
      language: "",
      code: "",
    };
  }

  //==============React Lifecycle Functions Start===================//
  componentDidMount() {
    console.log(this.props.programid);
    if (this.props.programid != null) {
      this.getProgram(this.props.programid);
      console.log("ya");
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.screenWidth !== prevProps.screenWidth) {
      if (this.props.screenWidth <= EDITOR_WIDTH_BREAKPOINT) {
        if (this.state.viewMode === CODE_AND_OUTPUT) {
          this.setState({ viewMode: CODE_ONLY });
        }
      }
    }
  }

  getProgram = async programid => {
    const { ok, sketch } = await fetch.getSketch(programid);
    this.setState({
      sketchName: sketch.name,
      language: sketch.language,
      code: sketch.code,
    });
    console.log(sketch);
    console.log(sketch.name);
    this.props.setProgramCode(this.props.mostRecentProgram, sketch.code);
    this.props.runCode(sketch.code, sketch.language);
    return { ok, sketch };
  };

  onThemeChange = () => {
    let newTheme = this.state.theme === "dark" ? "light" : "dark";
    cookies.setThemeCookie(newTheme);
    this.setState({ theme: newTheme });
  };

  handleDownload = () => {
    CodeDownloader.download(this.state.sketchName, this.state.language, this.state.code);
  };

  renderSketchesPage = () => <SketchesPageContainer />;

  renderContent = () => {
    switch (this.props.contentType) {
      case "sketches":
        return this.renderSketchesPage();
      case "editor":
      default:
        return this.renderEditor();
    }
  };

  renderCodeAndOutput = () => (
    <SplitPane
      resizerStyle={{
        height: "67px",
        borderLeft: "2px solid #333",
        borderRight: "2px solid #333",
        width: "10px",
      }}
      pane1Style={this.state.pane1Style}
      //functions called when you start and finish a drag
      //removes and re-addsthe transition effect on the first panel when manually resizing
      onDragStarted={() => this.setState({ pane1Style: {} })}
      onDragFinished={() => this.setState({ pane1Style: { transition: "width .5s ease" } })}
      split="vertical" //the resizer is a vertical line (horizontal means resizer is a horizontal bar)
      minSize={
        (this.props.panelOpen ? this.props.screenWidth - PANEL_SIZE : this.props.screenWidth) * 0.33
      } //minimum size of code is 33% of the remaining screen size
      maxSize={
        (this.props.panelOpen ? this.props.screenWidth - PANEL_SIZE : this.props.screenWidth) * 0.75
      } //max size of code is 75% of the remaining screen size
      size={
        ((this.props.panelOpen ? this.props.screenWidth - PANEL_SIZE : this.props.screenWidth) /
          5) *
        3
      } //the initial size of the text editor section
      allowResize={true}
    >
      {this.renderCode()}
      {this.renderOutput()}
    </SplitPane>
  );

  updateViewMode = viewMode => {
    this.setState({ viewMode });
  };

  renderCode = () => (
    <TextEditorContainer
      key={this.props.mostRecentProgram}
      viewMode={this.state.viewMode}
      updateViewMode={this.updateViewMode}
      screenHeight={this.props.screenHeight}
      screenWidth={this.props.screenWidth}
      theme={this.state.theme}
      viewOnly={true}
      program={this.props.programid}
      sketchName={this.state.sketchName}
      language={this.state.language}
      handleDownload={this.handleDownload}
    />
  );

  renderOutput = () => (
    <OutputContainer
      viewMode={this.state.viewMode}
      updateViewMode={this.updateViewMode}
      isSmall={this.props.screenWidth <= EDITOR_WIDTH_BREAKPOINT}
      viewOnly={true}
      vLanguage={this.state.language}
      code={this.state.code}
    />
  );

  renderEditor = () => {
    const codeStyle = {
      width: this.props.screenWidth - (this.props.left || 0),
      height: this.props.screenHeight,
    };

    switch (this.state.viewMode) {
      case CODE_ONLY:
        return <div style={codeStyle}>{this.renderCode()}</div>;
      case OUTPUT_ONLY:
        return <div style={codeStyle}>{this.renderOutput()}</div>;
      default:
        return this.renderCodeAndOutput();
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    const codeStyle = {
      left: this.props.left || 0,
      width: this.props.screenWidth - (this.props.left || 0),
      height: this.props.screenHeight,
    };

    return (
      <div className="main">
        <ProfilePanelContainer
          contentType={this.props.contentType}
          theme={this.state.theme}
          onThemeChange={this.onThemeChange}
        />
        <div className="editor" style={codeStyle}>
          {this.renderContent()}
        </div>
      </div>
    );
  }
}

export default ViewOnly;
