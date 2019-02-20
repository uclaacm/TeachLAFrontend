import React from "react";
import SplitPane from "react-split-pane";
import OutputContainer from "../containers/OutputContainer.js";
import TextEditorContainer from "../containers/TextEditorContainer";
import DropdownButton from "./DropdownButton";
import RunButton from "./RunButton";
import SaveButton from "./SaveButton";
import * as fetch from "../../../lib/fetch.js";

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
      paneStyle: { transition: "none" },
      saveText: "Save code",
    };
  }

  //==============React Lifecycle Functions Start===================//
  componentWillMount() {
    //update the most recent program if it doesn't exist or is an empty string
    if (!this.props.mostRecentProgram.length) {
      this.props.resetMostRecentProgram();
    }
  }

  resetSaveText = () => {
    this.setState({
      saveText: "Save code",
    });
  };

  handleSave = event => {
    var programsJson = {};

    programsJson["HTML"] = this.props.programs.getIn(["HTML", "code"]);
    programsJson["Processing"] = this.props.programs.getIn(["Processing", "code"]);
    programsJson["Python"] = this.props.programs.getIn(["Python", "code"]);

    fetch.updatePrograms(this.props.uid, programsJson).then(() => {
      this.setState({
        saveText: "Saved!",
      });

      setTimeout(this.resetSaveText, 3000);
    });
  };

  renderOpenPanelButton = () => {
    const { panelVisible, handleOnVisibleChange } = this.props;

    //if the left panel is closed, show an empty div
    if (panelVisible) {
      return <div className="editor-expand-panel-arrow" />;
    }

    // otherwise show a > that when clicked, opens the panel
    return (
      <div
        className="editor-expand-panel-arrow"
        title="Open Profile Panel"
        onClick={handleOnVisibleChange}
      >
        >
      </div>
    );
  };

  renderDropdown = () => {
    //dropdown items should be an array of objects with two keys: value and display
    let dropdownItems = [];

    //keySeq returns an Immutable object, so go through each key and push it into an array
    if (this.props.programs) {
      this.props.programs.keySeq().forEach(key => dropdownItems.push(key));
    }

    return (
      <DropdownButton
        displayValue={this.props.mostRecentProgram}
        onSelect={this.props.setMostRecentProgram}
        dropdownItems={dropdownItems}
      />
    );
  };

  render() {
    //called deconstruction; pulling children, triggerLogin, ..., textPadding out of props
    const { codeStyle, textEditorSize } = this.props;

    const minSize = this.props.width * 0.25;
    const maxSize = this.props.panelVisible ? this.props.width * 0.5 : this.props.width * 0.66;

    //header is 60 pixels with a 1 pixel border and 20 for the top padding
    const textEditorHeight = this.props.height - 61 - 20;

    return (
      <div style={codeStyle}>
        {/* TODO: there appears to be a bug with how much the split pane is able to move.  This bug is triggered by
					minimizing the profile panel, maximizing it again, and trying to move the split pane.  The speed of movement
					is greatly reduced*/}
        <SplitPane
          //makes split pane resizer more consistent
          //bc you can hover over the iframe while dragging
          //and it steals the mouse
          resizerStyle={{
            height: "60px",
            borderLeft: "2px solid #333",
            borderRight: "2px solid #333",
            width: "10px",
          }}
          split="vertical" //the resizer is a vertical line (horizontal means resizer is a horizontal bar)
          minSize={minSize} //minimum size of code is 25% of screen not including panel and max size is 50%
          maxSize={maxSize} //maximum size is 75% of the screen if the panel  is open, 50% otherwise
          size={textEditorSize} //the initial size of the text editor section
          allowResize={true}
        >
          <div className="code-section">
            <div className="code-section-banner">
              {this.renderOpenPanelButton()}
              {this.renderDropdown()}
              <RunButton runCode={this.props.runCode} />
              <SaveButton handleSave={this.handleSave} text={this.state.saveText} />
            </div>
            <div
              className="text-editor-container"
              style={{
                height: textEditorHeight,
                minHeight: textEditorHeight,
                maxHeight: textEditorHeight,
              }}
            >
              <TextEditorContainer key={this.props.mostRecentProgram} />
            </div>
          </div>
          <OutputContainer height={this.props.height} />
        </SplitPane>
      </div>
    );
  }
}

export default Main;
