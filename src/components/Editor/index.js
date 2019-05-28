import React from "react";
import SplitPane from "react-split-pane";
import OutputContainer from "./containers/OutputContainer.js";
import TextEditorContainer from "./containers/TextEditorContainer";
import DropdownButtonContainer from "./containers/DropdownButtonContainer";
import OpenPanelButtonContainer from "../common/containers/OpenPanelButtonContainer";
import EditorButton from "./components/EditorButton";
import * as fetch from "../../lib/fetch.js";
import EditorRadio from "./components/EditorRadio.js";
import {
  EDITOR_WIDTH_BREAKPOINT,
  CODE_AND_OUTPUT,
  CODE_ONLY,
  OUTPUT_ONLY,
  CODE_WIDTH_BREAKPOINT,
  CODE_MIN_TEXT_EDITOR_SIZE,
} from "./constants";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { PANEL_SIZE } from "../../constants";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "../../styles/CustomCM.css";
import "../../styles/Resizer.css";
import "../../styles/Editor.css";

/**------Props-------
 * togglePanel: function to call when you want the Profile Panel to disappear/reapper
 * left: the left css property that should be applied on the top level element
 */

const saveIconText = (
  <div
    style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      height: "100%",
      padding: "0 5px",
    }}
  >
    <FontAwesomeIcon icon={faSave} color={"#ddd"} />
    <span style={{ height: "100%", lineHeight: "42px", width: "100%", float: "center" }}>Save</span>
  </div>
);
class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      saveText: saveIconText,
      viewMode: CODE_AND_OUTPUT,
      pane1Style: { transition: "width .5s ease" },
      codeHeaderMode: "BIG",
    };
  }

  //==============React Lifecycle Functions Start===================//
  componentWillMount() {
    if (this.props.editorWidth <= EDITOR_WIDTH_BREAKPOINT) {
      this.setState({ viewMode: CODE_ONLY });
      if (this.props.editorWidth < CODE_WIDTH_BREAKPOINT) {
        this.setState({ codeHeaderMode: "SMALL" });
      }
    }

    if (this.props.editorWidth / 2 < CODE_WIDTH_BREAKPOINT) {
      this.setState({ codeHeaderMode: "SMALL" });
    }
  }

  componentDidUpdate(prevProps) {
    const textEditorSize = this.props.editorWidth / 2;
    if (this.props.editorWidth !== prevProps.editorWidth) {
      if (this.props.editorWidth <= EDITOR_WIDTH_BREAKPOINT) {
        if (this.state.viewMode === CODE_AND_OUTPUT) {
          this.setState({ viewMode: CODE_ONLY });
        }
      }

      if (this.state.codeHeaderMode == "BIG") {
        if (textEditorSize <= CODE_WIDTH_BREAKPOINT) {
          this.setState({ codeHeaderMode: "SMALL" });
        }
      } else if (textEditorSize > CODE_WIDTH_BREAKPOINT) {
        this.setState({ codeHeaderMode: "BIG" });
      }

      if (this.editorWidth < CODE_WIDTH_BREAKPOINT) {
        this.setState({ codeHeaderMode: "SMALL" });
      }
    }
  }

  resetSaveText = () => {
    this.setState({
      saveText: saveIconText,
    });
  };

  handleSave = event => {
    if (!this.props.dirty) return; // Don't save if not dirty (unedited)
    this.setState({
      saveText: "Saving...",
    });

    let programToUpdate = {};

    programToUpdate[this.props.mostRecentProgram] = {
      code: this.props.code,
    };

    fetch.updatePrograms(this.props.uid, programToUpdate).then(() => {
      this.setState({
        saveText: "Saved!",
      });

      setTimeout(this.resetSaveText, 3000);
    });
    this.props.cleanCode(this.props.mostRecentProgram); // Set code's "dirty" state to false
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
      onChange={size => {
        if (size > CODE_WIDTH_BREAKPOINT && this.state.codeHeaderMode == "SMALL") {
          this.setState({ codeHeaderMode: "BIG" });
        } else if (size < CODE_WIDTH_BREAKPOINT && this.state.codeHeaderMode == "BIG") {
          this.setState({ codeHeaderMode: "SMALL" });
        }
      }}
      split="vertical" //the resizer is a vertical line (horizontal means resizer is a horizontal bar)
      minSize={CODE_MIN_TEXT_EDITOR_SIZE} //minimum size of code is 33% of the remaining screen size
      maxSize={this.props.editorWidth * 0.75} //max size of code is 75% of the remaining screen size
      size={this.props.editorWidth / 2} //the initial size of the text editor section
      allowResize={true}
    >
      {this.renderCode()}
      {this.renderOutput()}
    </SplitPane>
  );

  updateViewMode = viewMode => {
    this.setState({ viewMode });
    if (viewMode === CODE_ONLY) {
      if (this.props.editorWidth > CODE_WIDTH_BREAKPOINT) {
        this.setState({ codeHeaderMode: "BIG" });
      } else {
        this.setState({ codeHeaderMode: "SMALL" });
      }
    } else if (viewMode === CODE_AND_OUTPUT) {
      if (this.props.editorWidth / 2 < CODE_WIDTH_BREAKPOINT) {
        this.setState({ codeHeaderMode: "SMALL" });
      } else {
        this.setState({ codeHeaderMode: "BIG" });
      }
    }
  };

  renderCodeHeader = () => {
    return (
      <div className="code-section-header">
        <OpenPanelButtonContainer />
        <DropdownButtonContainer useThumbnail={this.state.codeHeaderMode === "SMALL"} />
        <div style={{ marginLeft: "auto" }}>
          <EditorRadio
            viewMode={this.state.viewMode}
            codeHeaderMode={this.state.codeHeaderMode}
            updateViewMode={this.updateViewMode}
            isSmall={this.props.editorWidth <= EDITOR_WIDTH_BREAKPOINT}
          />
        </div>
        <EditorButton handleClick={this.handleSave} text={this.state.saveText} />
      </div>
    );
  };

  renderCode = () => (
    <div className="code-section">
      {this.renderCodeHeader()}
      <div
        className="text-editor-container"
        style={{
          height: this.props.screenHeight - 61 - 20,
          minHeight: this.props.screenHeight - 61 - 20,
          maxHeight: this.props.screenHeight - 61 - 20,
        }}
      >
        <TextEditorContainer key={this.props.mostRecentProgram} />
      </div>
    </div>
  );

  renderOutput = () => (
    <OutputContainer
      viewMode={this.state.viewMode}
      updateViewMode={this.updateViewMode}
      isSmall={this.props.editorWidth <= EDITOR_WIDTH_BREAKPOINT}
    />
  );

  renderContent = () => {
    const codeStyle = {
      width: this.props.editorWidth,
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
    const codeStyle = {
      left: this.props.left || 0,
      width: this.props.editorWidth,
      height: this.props.screenHeight,
    };

    return (
      <div className="editor" style={codeStyle}>
        {this.renderContent()}
      </div>
    );
  }
}

export default Editor;
