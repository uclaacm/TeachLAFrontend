import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { EDITOR_WIDTH_BREAKPOINT, CODE_AND_OUTPUT, CODE_ONLY } from '../constants';
import * as cookies from '../lib/cookies.js';
import * as fetch from '../lib/fetch.js';

import ProfilePanelContainer from './common/containers/ProfilePanelContainer';
import EditorAndOutput from './EditorAndOutput/EditorAndOutput';
import SketchesPageContainer from './Sketches/containers/SketchesContainer';

import '../styles/Main.scss';

/** ------Props-------
 * togglePanel: function to call when you want the Profile Panel to disappear/reapper
 * panelOpen: boolean telling whether the Profile Panel is open or not
 * left: the left css property that should be applied on the top level element
 */

const Main = (props) => {
  const [saveText, setText] = useState('Save');
  const [viewMode, setView] = useState(props.screenWidth <= EDITOR_WIDTH_BREAKPOINT ? CODE_ONLY : CODE_AND_OUTPUT);
  const [pane1Style, changePane1Style] = useState([{ transition: 'width .5s ease' }]);
  //const [varName] = props;

    // Set theme from cookies (yum)
  //props.setTheme(cookies.getThemeFromCookie());

  useEffect(() => {
    if (props.screenWidth <= EDITOR_WIDTH_BREAKPOINT) {
      if (viewMode === CODE_AND_OUTPUT) {
        setView(CODE_ONLY);
      }
    }
  },[props.screenWidth]);
  // const componentDidUpdate = (prevProps) => {
  //   if (props.screenWidth !== prevProps.screenWidth) {
  //     if (props.screenWidth <= EDITOR_WIDTH_BREAKPOINT) {
  //       if (viewMode === CODE_AND_OUTPUT) {
  //         setView(CODE_ONLY);
  //       }
  //     }
  //   }
  // }

  const onThemeChange = () => {
    const newTheme = props.theme === 'dark' ? 'light' : 'dark';
    cookies.setThemeCookie(newTheme);
    props.setTheme(newTheme);
  }

  const resetSaveText = () => {
    setText('Save');
  }

  const handleSave = () => {
    if (!props.dirty) return; // Don't save if not dirty (unedited)
    setText('Saving...');

    const programToUpdate = {};
    //do
    programToUpdate[props.mostRecentProgram] = {
      code: props.code,
    }

    fetch.updatePrograms(props.uid, programToUpdate).then(() => {
      setText('Saved!');

      setTimeout(resetSaveText, 3000);
    });
    props.cleanCode(props.mostRecentProgram); // Set code's "dirty" state to false
  }

  const renderContent = () => {
    switch (props.contentType) {
    case 'editor':
      return renderEditor();
    case 'sketches':
    default:
      return <SketchesPageContainer />;
    }
  }

  const renderEditor = () => (
    <EditorAndOutput
      // view mode
      viewMode={viewMode}
      updateViewMode={(viewMode) => setView({ viewMode })}
      // theme
      theme={props.theme}
      // sizing
      left={props.left}
      screenWidth={props.screenWidth}
      screenHeight={props.screenHeight}
      // view only trigger
      viewOnly={false}
      // pane
      panelOpen={props.panelOpen}
      pane1Style={pane1Style}
      changePane1Style={(newStyle) => changePane1Style(newStyle)}
      // program information
      mostRecentProgram={props.mostRecentProgram}
      language={props.language}
      code={props.code}
      programid={props.programid}
      sketchName={props.sketchName}
      // save handler
      saveText={saveText}
      handleSave={handleSave}
    />
  );

    // this stops us from rendering editor with no sketches available
    if (props.contentType === 'editor' && props.listOfPrograms.length === 0) {
      return <Redirect to="/sketches" />;
    }
    const codeStyle = {
      left: props.left || 0,
      width: props.screenWidth - (props.left || 0),
      height: props.screenHeight,
    }

    return (
      <div className={`main theme-${props.theme}`}>
        <ProfilePanelContainer
          contentType={props.contentType}
          theme={props.theme}
          onThemeChange={onThemeChange}
        />
        <div className="editor" style={codeStyle}>
          {renderContent()}
        </div>
      </div>
    );
}
export default Main;