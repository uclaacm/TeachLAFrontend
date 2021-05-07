import React from 'react';
import { Redirect } from 'react-router-dom';

import { EDITOR_WIDTH_BREAKPOINT, CODE_AND_OUTPUT, CODE_ONLY } from '../constants';
import * as cookies from '../lib/cookies.js';
import * as fetch from '../lib/fetch.js';

import ProfilePanelContainer from './common/containers/ProfilePanelContainer';
import EditorAndOutput from './EditorAndOutput/EditorAndOutput';
import SketchesPageContainer from './Sketches/containers/SketchesContainer';


import 'styles/Main.scss';

/**------Props-------
 * togglePanel: function to call when you want the Profile Panel to disappear/reapper
 * panelOpen: boolean telling whether the Profile Panel is open or not
 * left: the left css property that should be applied on the top level element
 */

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      saveText: 'Save',
      viewMode: this.props.screenWidth <= EDITOR_WIDTH_BREAKPOINT ? CODE_ONLY : CODE_AND_OUTPUT,
      pane1Style: { transition: 'width .5s ease' },
    };

    // Set theme from cookies (yum)
    this.props.setTheme(cookies.getThemeFromCookie());
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

  onThemeChange = () => {
    let newTheme = this.props.theme === 'dark' ? 'light' : 'dark';
    cookies.setThemeCookie(newTheme);
    this.props.setTheme(newTheme);
  };

  resetSaveText = () => {
    this.setState({
      saveText: 'Save',
    });
  };

  handleSave = () => {
    if (!this.props.dirty) return; // Don't save if not dirty (unedited)
    this.setState({
      saveText: 'Saving...',
    });

    let programToUpdate = {};

    programToUpdate[this.props.mostRecentProgram] = {
      code: this.props.code,
    };

    fetch.updatePrograms(this.props.uid, programToUpdate).then(() => {
      this.setState({
        saveText: 'Saved!',
      });

      setTimeout(this.resetSaveText, 3000);
    });
    this.props.cleanCode(this.props.mostRecentProgram); // Set code's "dirty" state to false
  };

  renderContent = () => {
    switch (this.props.contentType) {
    case 'editor':
      return this.renderEditor();
    case 'sketches':
    default:
      return <SketchesPageContainer />;
    }
  };

  renderEditor = () => (
    <EditorAndOutput
      // view mode
      viewMode={this.state.viewMode}
      updateViewMode={(viewMode) => this.setState({ viewMode })}
      // theme
      theme={this.props.theme}
      // sizing
      left={this.props.left}
      screenWidth={this.props.screenWidth}
      screenHeight={this.props.screenHeight}
      // view only trigger
      viewOnly={false}
      // pane
      panelOpen={this.props.panelOpen}
      pane1Style={this.state.pane1Style}
      changePane1Style={(newStyle) => this.setState(newStyle)}
      // program information
      mostRecentProgram={this.props.mostRecentProgram}
      language={this.props.language}
      code={this.props.code}
      programid={this.props.programid}
      sketchName={this.props.sketchName}
      // save handler
      saveText={this.state.saveText}
      handleSave={this.handleSave}
    />
  );

  render() {
    // this stops us from rendering editor with no sketches available
    if (this.props.contentType === 'editor' && this.props.listOfPrograms.length === 0) {
      return <Redirect to={'/sketches'} />;
    }
    const codeStyle = {
      left: this.props.left || 0,
      width: this.props.screenWidth - (this.props.left || 0),
      height: this.props.screenHeight,
    };

    return (
      <div className={'main theme-' + this.props.theme}>
        <ProfilePanelContainer
          contentType={this.props.contentType}
          theme={this.props.theme}
          onThemeChange={this.onThemeChange}
        />
        <div className="editor" style={codeStyle}>
          {this.renderContent()}
        </div>
      </div>
    );
  }
}

export default Main;
