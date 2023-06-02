import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { setMostRecentProgram } from '../actions/userDataActions';
import { EDITOR_WIDTH_BREAKPOINT, CODE_AND_OUTPUT, CODE_ONLY, CLOSED_PANEL_LEFT, OPEN_PANEL_LEFT, PANEL_SIZE } from '../constants';
import * as cookies from '../lib/cookies';
import * as fetch from '../lib/fetch';
import ClassPageContainer from './Class/containers/ClassPageContainer';
import ClassesPageContainer from './Classes/containers/ClassesContainer';
import ProfilePanelContainer from './common/containers/ProfilePanelContainer';
import EditorAndOutput from './EditorAndOutput/EditorAndOutput';
import SketchesPageContainer from './Sketches/containers/SketchesContainer';

import '../styles/Main.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../reducers/uiReducer'
import { setProgramDirty } from '../reducers/programsReducer'

function Main({
  uid,
  contentType,
  programid,
}) {

  const dispatch = useDispatch();

  // Keep mostRecentProgram consistent with programid in the URL
  useEffect(() => {
    console.log(`our effect is happening with programid ${programid}`)
    if (programid !== undefined) {
      try {
        console.log(`updating ${programid}`)
        fetch.updateUserData(uid, { mostRecentProgram: programid }).catch((err) => {
          console.error(err);
        });
      } catch (err) {
        console.error(err);
      }
      dispatch(setMostRecentProgram(programid));
    }
  }, [programid]);


  /* TODO: refactor state.programs to association-list */
  const numPrograms = useSelector(state => Object.keys(state.programs).length);

  // Set theme from cookies (yum)
  useEffect(() => {
    dispatch(setTheme(cookies.getThemeFromCookie()));
  }, []);

  const onThemeChange = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    cookies.setThemeCookie(newTheme);
    dispatch(setTheme(newTheme));
  };

  const resetSaveText = () => {
    setSaveText('Save');
  };

  const handleSave = () => {
    if (!dirty) return; // Don't save if not dirty (unedited)
    setSaveText('Saving...');

    const programToUpdate = {};
    programToUpdate[programid] = {
      code,
    };

    fetch.updatePrograms(uid, programToUpdate).then(() => {
      setSaveText('Saved!');
      setTimeout(resetSaveText, 3000);
    });

    dispatch(setProgramDirty({ program: programid, dirty: false }));
  };

  const renderEditor = () => (
    <EditorAndOutput
      // view mode
      // viewMode={viewMode}
      // updateViewMode={(mode) => setViewMode(mode)}
      // view only trigger
      viewOnly={false}
      // pane
      // pane1Style={pane1Style}
      // changePane1Style={setPane1Style}
      // program information
      // language={language}
      // code={code}
      programid={programid}
      // sketchName={sketchName}
      // save handler
      // saveText={saveText}
      handleSave={handleSave}
    />
  );

  const renderContent = () => {
    switch (contentType) {
      case 'editor':
        return renderEditor();
      case 'classes':
        return <ClassesPageContainer />;
      case 'classPage':
        return <ClassPageContainer />;
      case 'sketches':
      default:
        return <SketchesPageContainer />;
    }
  };

  // this stops us from rendering editor with no sketches available
  if (contentType === 'editor' && numPrograms === 0) {
    return <Redirect to="/sketches" />;
  }

  const panelOpen = useSelector(state => state.ui.panelOpen);
  const left = (panelOpen ? OPEN_PANEL_LEFT : CLOSED_PANEL_LEFT) + PANEL_SIZE;
  const screenWidth = useSelector(state => state.ui.screenWidth);
  const screenHeight = useSelector(state => state.ui.screenHeight);
  const theme = useSelector(state => state.ui.theme);

  const codeStyle = {
    left: left || 0,
    width: screenWidth - (left || 0),
    height: screenHeight,
  };

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
