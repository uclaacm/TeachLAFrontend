import React from "react";
import SplitPane from "react-split-pane";
import { Button } from "reactstrap";
import OutputContainer from "./containers/OutputContainer.js";
import TextEditorContainer from "./containers/TextEditorContainer";
import DropdownButtonContainer from "./containers/DropdownButtonContainer";
import OpenPanelButtonContainer from "../common/containers/OpenPanelButtonContainer";
import * as fetch from "../../lib/fetch.js";
import EditorRadio from "./components/EditorRadio.js";
import { Redirect } from "react-router-dom";
import { EDITOR_WIDTH_BREAKPOINT, CODE_AND_OUTPUT, CODE_ONLY, OUTPUT_ONLY } from "./constants";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

import { PANEL_SIZE } from "../../constants";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "../../styles/CustomCM.css";
import "../../styles/Resizer.css";
import "../../styles/Editor.css";

/**------Props-------
 * togglePanel: function to call when you want the Profile Panel to disappear/reapper
 * panelOpen: boolean telling whether the Profile Panel is open or not
 * left: the left css property that should be applied on the top level element
 */

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      saveText: "Save",
      viewMode: CODE_AND_OUTPUT,
      redirect: "",
      pane1Style: { transition: "width .5s ease" },
    };
  }

  //==============React Lifecycle Functions Start===================//
  componentWillMount() {
    if (this.props.screenWidth <= EDITOR_WIDTH_BREAKPOINT) {
      this.setState({ viewMode: CODE_ONLY });
    }
    if (this.props.listOfPrograms.length === 0) {
      this.setState({ redirect: "/sketches" });
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

  resetSaveText = () => {
    this.setState({
      saveText: "Save",
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

  renderDropdown = () => <DropdownButtonContainer />;

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
        (this.props.panelOpen ? this.props.screenWidth - PANEL_SIZE : this.props.screenWidth) / 2
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
    <div className="code-section">
      <div className="code-section-banner">
        <OpenPanelButtonContainer />
        {this.renderDropdown()}
        <div style={{ marginLeft: "auto" }}>
          <EditorRadio
            viewMode={this.state.viewMode}
            updateViewMode={this.updateViewMode}
            isSmall={this.props.screenWidth <= EDITOR_WIDTH_BREAKPOINT}
          />
        </div>
        <Button className="mx-2" color="success" size="lg" onClick={this.handleSave}>
          <FontAwesomeIcon icon={faSave} />
          &nbsp;&nbsp;{this.state.saveText}
        </Button>
      </div>
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
      isSmall={this.props.screenWidth <= EDITOR_WIDTH_BREAKPOINT}
    />
  );

  renderContent = () => {
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
      <div className="editor" style={codeStyle}>
        {this.renderContent()}
      </div>
    );
  }
}

export default Editor;
