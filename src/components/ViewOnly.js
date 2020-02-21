import React from "react";

import * as fetch from "../lib/fetch.js";
import * as cookies from "../lib/cookies.js";

import ProfilePanelContainer from "./common/containers/ProfilePanelContainer";
import EditorAndOutput from "./EditorAndOutput/EditorAndOutput";

import { EDITOR_WIDTH_BREAKPOINT, CODE_AND_OUTPUT, CODE_ONLY } from "../constants";

import "styles/Main.scss";

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
      programID: "",
      sketchName: "",
      language: "",
      thumbnail: "",
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
      thumbnail: sketch.thumbnail,
    });
    console.log(sketch);
    console.log(sketch.name);
    this.props.setProgramCode(this.props.mostRecentProgram, sketch.code);
    this.props.runCode(sketch.code, sketch.language);
    return { ok, sketch };
  };

  onThemeChange = () => {
    let newTheme = this.props.theme === "dark" ? "light" : "dark";
    cookies.setThemeCookie(newTheme);
    this.props.setTheme(newTheme);
  };

  render() {
    const codeStyle = {
      left: this.props.left || 0,
      width: this.props.screenWidth - (this.props.left || 0),
      height: this.props.screenHeight,
    };

    return (
      <div className={`main theme-` + this.props.theme}>
        <ProfilePanelContainer
          contentType={this.props.contentType}
          theme={this.props.theme}
          onThemeChange={this.onThemeChange}
        />
        <div className="editor" style={codeStyle}>
          <EditorAndOutput
            // view mode
            viewMode={this.state.viewMode}
            updateViewMode={viewMode => this.setState({ viewMode })}
            // theme
            theme={this.props.theme}
            // sizing
            left={this.props.left}
            screenWidth={this.props.screenWidth}
            screenHeight={this.props.screenHeight}
            // view only trigger
            viewOnly={true}
            // pane
            panelOpen={this.props.panelOpen}
            pane1Style={this.state.pane1Style}
            changePane1Style={newStyle => this.setState(newStyle)}
            // program information
            mostRecentProgram={this.props.mostRecentProgram}
            language={this.state.language}
            code={this.state.code}
            programid={this.props.programid}
            sketchName={this.state.sketchName}
            thumbnail={this.state.thumbnail}
          />
        </div>
      </div>
    );
  }
}

export default ViewOnly;
