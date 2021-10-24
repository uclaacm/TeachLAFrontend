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

const Main = ({
  screenWidth, theme, dirty, mostRecentProgram, code, uid,
  contentType, left, screenHeight, panelOpen, language, programid,
  sketchName, listOfPrograms, setTheme
}) => {
  const [saveText, setSaveText] = useState('Save');
  const [viewMode, setViewMode] = useState(screenWidth <= EDITOR_WIDTH_BREAKPOINT ? CODE_ONLY : CODE_AND_OUTPUT);
  const [pane1Style, setPane1Style] = useState({ transition: 'width .5s ease' });

  // Set theme from cookies (yum)
  useEffect(() => {
    setTheme(cookies.getThemeFromCookie());
  },[]);

  useEffect(() => {
    if (screenWidth <= EDITOR_WIDTH_BREAKPOINT) {
      if (viewMode === CODE_AND_OUTPUT) {
        setViewMode(CODE_ONLY);
      }
    }
  },[screenWidth]);

  const onThemeChange = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    cookies.setThemeCookie(newTheme);
    setTheme(newTheme);
  }

  const resetSaveText = () => {
    setSaveText('Save');
  }

  const handleSave = () => {
    if (!dirty) return; // Don't save if not dirty (unedited)
    setSaveText('Saving...');

    const programToUpdate = {};
    programToUpdate[mostRecentProgram] = {
      code: code,
    }

    fetch.updatePrograms(uid, programToUpdate).then(() => {
      setSaveText('Saved!');

      setTimeout(resetSaveText, 3000);
    });
    cleanCode(mostRecentProgram); // Set code's "dirty" state to false
  }

  const renderContent = () => {
    switch (contentType) {
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
      updateViewMode={(viewMode) => setViewMode({ viewMode })}
      // theme
      theme={theme}
      // sizing
      left={left}
      screenWidth={screenWidth}
      screenHeight={screenHeight}
      // view only trigger
      viewOnly={false}
      // pane
      panelOpen={panelOpen}
      pane1Style={pane1Style}
      setPane1Style={(newStyle) => setPane1Style(newStyle)}
      // program information
      mostRecentProgram={mostRecentProgram}
      language={language}
      code={code}
      programid={programid}
      sketchName={sketchName}
      // save handler
      saveText={saveText}
      handleSave={handleSave}
    />
  );

    // this stops us from rendering editor with no sketches available
    if (contentType === 'editor' && listOfPrograms.length === 0) {
      return <Redirect to="/sketches" />;
    }
    const codeStyle = {
      left: left || 0,
      width: screenWidth - (left || 0),
      height: screenHeight,
    }

    return (
      <div className={`main theme-${theme}`}>
        <ProfilePanelContainer
          contentType={contentType}
          theme={theme}
          onThemeChange={onThemeChange}
        />
        <div className="editor" style={codeStyle}>
          {renderContent()}
        </div>
      </div>
    );
}
export default Main;
