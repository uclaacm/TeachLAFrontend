import React from "react";
import SplitPane from "react-split-pane";
import OutputContainer from "../containers/OutputContainer.js";
import TextEditorContainer from "../containers/TextEditorContainer";
import DropdownButtonContainer from "../containers/DropdownButtonContainer";
import EditorButton from "./EditorButton";
import * as fetch from "../../../lib/fetch.js";
import EditorRadio from "./EditorRadio.js";
import { EDITOR_WIDTH_BREAKPOINT, CODE_AND_OUTPUT, CODE_ONLY, OUTPUT_ONLY } from "../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**------Props-------
 * textEditorSize: number? representing the percentage of space the left split pane takes up
 * handleOnVisibleChange: function to call when you want the Profile Panel to disappear/reapper
 * panelVisible: boolean telling whether the Profile Panel is open or not
 * codeStyle: object used to style the whole container //TODO: rename or move this prop
 * hotReload: boolean telling if //TODO: figure out a better place for this/remove it
 */

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      saveText: "Save code",
      viewMode: CODE_AND_OUTPUT,
    };
  }

  //==============React Lifecycle Functions Start===================//
  componentWillMount() {
    if (this.props.screenWidth <= EDITOR_WIDTH_BREAKPOINT) {
      this.setState({ viewMode: CODE_ONLY });
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
      saveText: "Save code",
    });
  };

  handleSave = event => {
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
  };

  renderOpenPanelButton = () => {
    const { panelVisible, handleOnVisibleChange } = this.props;

    //if the left panel is closed, show nothing
    //otherwise show hamburger icon
    return (
      <div
        className="editor-expand-panel-arrow"
        title="Open Profile Panel"
        onClick={handleOnVisibleChange}
      >
        {panelVisible ? "" : <FontAwesomeIcon icon="bars" />}
      </div>
    );
  };

  renderDropdown = () => <DropdownButtonContainer />;

  renderCodeAndOutput = () => (
    <SplitPane
      //makes split pane resizer more consistent
      //bc you can hover over the iframe while dragging
      //and it steals the mouse
      resizerStyle={{
        height: "67px",
        borderLeft: "2px solid #333",
        borderRight: "2px solid #333",
        width: "10px",
      }}
      split="vertical" //the resizer is a vertical line (horizontal means resizer is a horizontal bar)
      minSize={this.props.screenWidth * 0.25} //minimum size of code is 25% of screen not including panel and max size is 50%
      maxSize={
        this.props.panelVisible ? this.props.screenWidth * 0.5 : this.props.screenWidth * 0.66
      } //maximum size is 75% of the screen if the panel  is open, 50% otherwise
      size={this.props.textEditorSize} //the initial size of the text editor section
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
        {this.renderOpenPanelButton()}
        {this.renderDropdown()}
        <div style={{ marginLeft: "auto" }}>
          <EditorRadio
            viewMode={this.state.viewMode}
            updateViewMode={this.updateViewMode}
            isSmall={this.props.screenWidth <= EDITOR_WIDTH_BREAKPOINT}
          />
        </div>
        <EditorButton handleClick={this.handleSave} text={this.state.saveText} />
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
    switch (this.state.viewMode) {
      case CODE_ONLY:
        return this.renderCode();
      case OUTPUT_ONLY:
        return this.renderOutput();
      default:
        return this.renderCodeAndOutput();
    }
  };

  render() {
    return <div style={this.props.codeStyle}>{this.renderContent()}</div>;
  }
}

export default Main;
