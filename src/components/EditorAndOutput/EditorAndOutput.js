import React from "react";
import SplitPane from "react-split-pane";
import OutputContainer from "../Output/OutputContainer.js";
import TextEditorContainer from "../TextEditor/containers/TextEditorContainer.js";

import { EDITOR_WIDTH_BREAKPOINT, CODE_ONLY, OUTPUT_ONLY, PANEL_SIZE } from "../../constants";
import CodeDownloader from "../../util/languages/CodeDownloader";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/theme/duotone-light.css";
import "styles/CustomCM.scss";
import "styles/Resizer.scss";
import "styles/Editor.scss";

class EditorAndOutput extends React.Component {
  handleDownload = () => {
    CodeDownloader.download(this.props.sketchName, this.props.language, this.props.code);
  };

  renderCodeAndOutput = () => (
    <SplitPane
      resizerStyle={{
        height: "67px",
        borderLeft: "2px solid #333",
        borderRight: "2px solid #333",
        width: "10px",
      }}
      pane1Style={this.props.pane1Style}
      //functions called when you start and finish a drag
      //removes and re-addsthe transition effect on the first panel when manually resizing
      onDragStarted={() => this.props.changePane1Style({ pane1Style: {} })}
      onDragFinished={() =>
        this.props.changePane1Style({ pane1Style: { transition: "width .5s ease" } })
      }
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

  renderCode = () => (
    <TextEditorContainer
      key={this.props.mostRecentProgram}
      viewMode={this.props.viewMode}
      updateViewMode={this.props.updateViewMode}
      screenHeight={this.props.screenHeight}
      screenWidth={this.props.screenWidth}
      theme={this.props.theme}
      viewOnly={this.props.viewOnly}
      program={this.props.programid}
      sketchName={this.props.sketchName}
      language={this.props.language}
      handleDownload={this.handleDownload}
      handleSave={this.props.handleSave}
      saveText={this.props.saveText}
      thumbnail={this.props.thumbnail}
    />
  );

  renderOutput = () => (
    <OutputContainer
      viewMode={this.props.viewMode}
      updateViewMode={this.props.updateViewMode}
      isSmall={this.props.screenWidth <= EDITOR_WIDTH_BREAKPOINT}
      viewOnly={this.props.viewOnly}
      vLanguage={this.props.language}
      code={this.props.code}
    />
  );
  render = () => {
    const codeStyle = {
      width: this.props.screenWidth - (this.props.left || 0),
      height: this.props.screenHeight,
    };

    switch (this.props.viewMode) {
      case CODE_ONLY:
        return <div style={codeStyle}>{this.renderCode()}</div>;
      case OUTPUT_ONLY:
        return <div style={codeStyle}>{this.renderOutput()}</div>;
      default:
        return this.renderCodeAndOutput();
    }
  };
}

export default EditorAndOutput;
