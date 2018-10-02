import React from "react";
import SplitPane from "react-split-pane";
import OutputContainer from "../containers/OutputContainer.js";
import TextEditorContainer from "../containers/TextEditorContainer";
import DropdownButton from "./DropdownButton";
import RunButton from "./RunButton";

/**------Props-------
 * paneStyle: object used to style the text editor pane
 * size: number? representing the percentage of space the split pane takes up
 * onSplitPaneChange: function called when the Split pane bar for resizing is used
 * handleOnVisibleChange: function to call when you want the Profile Panel to disappear/reapper
 * panelVisible: boolean telling whether the Profile Panel is open or not
 * codeStyle: object used to style the whole container //TODO: rename or move this prop
 * setPaneStyle: function to be called ? //TODO: remove this/find out why this existed in the first place...
 * hotReload: boolean telling if //TODO: figure out a better place for this/remove it
 */

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paneStyle: { transition: "none" },
    };
  }

  //==============React Lifecycle Functions Start===================//
  componentWillMount() {
    //update the most recent program if it doesn't exist or is an empty string
    if (!this.props.mostRecentProgram.length) {
      this.props.resetMostRecentProgram();
    }
  }

  renderOpenPanelButton = () => {
    const { panelVisible, handleOnVisibleChange } = this.props;

    //if the left panel is closed, show an empty div
    if (panelVisible) {
      return <div className="editor-expand-panel" style={{ width: "0px", padding: "0" }} />;
    }

    // otherwise show a > that when clicked, opens the panel
    return (
      <div
        className="editor-expand-panel"
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

  getHeaderStyle = () => ({
    height: "60px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    borderBottom: "1px white solid",
  });

  render() {
    //called deconstruction; pulling children, triggerLogin, ..., textPadding out of props
    const { codeStyle, paneStyle, textEditorSize } = this.props;

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
          pane1Style={paneStyle}
          split="vertical" //the resizer is a vertical line (horizontal means resizer is a horizontal bar)
          minSize={minSize} //minimum size of code is 25% of screen not including panel and max size is 50%
          maxSize={maxSize} //maximum size is 75% of the screen if the panel  is open, 50% otherwise
          size={textEditorSize} //the initial size of the text editor section
          allowResize={true}
          // onChange={onSplitPaneChange}
        >
          <div className="code-section">
            <div style={this.getHeaderStyle()}>
              {this.renderOpenPanelButton()}
              {this.renderDropdown()}
              <RunButton runCode={this.props.runCode} />
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
          <OutputContainer />
        </SplitPane>
      </div>
    );
  }
}

export default Main;
