import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { setMostRecentProgram } from '../actions/userDataActions';
import { CLOSED_PANEL_LEFT, OPEN_PANEL_LEFT, PANEL_SIZE } from '../constants';
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

function Main({
  contentType,
  programid,
}) {
  const dispatch = useDispatch();

  const uid = useSelector(state => state.userData.uid);

  // Keep mostRecentProgram consistent with programid in the URL
  useEffect(() => {
    if (programid !== undefined) {
      try {
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

  const renderEditor = () => (
    <EditorAndOutput
      viewOnly={false}
      uid={uid}
      programid={programid}
    />
  );

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
