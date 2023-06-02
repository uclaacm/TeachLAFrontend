import React, { useState, useEffect } from 'react';
import SplitPane from 'react-split-pane';
import {
  EDITOR_WIDTH_BREAKPOINT, CODE_ONLY, OUTPUT_ONLY, CODE_AND_OUTPUT, PANEL_SIZE, CLOSED_PANEL_LEFT
} from '../../constants';
import CodeDownloader from '../../util/languages/CodeDownloader';
import OutputContainer from '../Output/OutputContainer';
import TextEditorContainer from '../TextEditor/containers/TextEditorContainer';

import { useSelector, useDispatch } from 'react-redux'

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/duotone-light.css';
import '../../styles/CustomCM.scss';
import '../../styles/Resizer.scss';
import '../../styles/Editor.scss';

const EditorAndOutput = function (props) {
  const {
    // sketchName,
    // language,
    // code,
    // pane1Style,
    changePane1Style,
    // panelOpen,
    // screenWidth,
    // viewMode,
    // updateViewMode,
    // screenHeight,
    // theme,
    viewOnly,
    programid,
    // handleSave,
    // saveText,
    thumbnail,
    // left,
  } = props;

  const [saveText, setSaveText] = useState('Save');
  const [viewMode, setViewMode] = useState(
    screenWidth <= EDITOR_WIDTH_BREAKPOINT ? CODE_ONLY : CODE_AND_OUTPUT,
  );
  const [pane1Style, setPane1Style] = useState({ transition: 'width .5s ease' });

  useEffect(() => {
    if (screenWidth <= EDITOR_WIDTH_BREAKPOINT) {
      if (viewMode === CODE_AND_OUTPUT) {
        setViewMode(CODE_ONLY);
      }
    }
  }, [screenWidth, viewMode]);


  const dispatch = useDispatch();

  const theme = useSelector(state => state.ui.theme);
  const panelOpen = useSelector(state => state.ui.panelOpen);
  const left = (panelOpen ? OPEN_PANEL_LEFT : CLOSED_PANEL_LEFT) + PANEL_SIZE;
  const screenWidth = useSelector(state => state.ui.screenWidth);
  const screenHeight = useSelector(state => state.ui.screenHeight);

  /* NOTE: the selector is subscribing to any changes in state.programs[mostRecentProgram], not
   * code, dirty, name, or language, but this is alright for our purposes */
  const { code, dirty, name: sketchName, language } = useSelector(state => {
    return state.programs[programid]
  });
  const handleDownload = () => {
    CodeDownloader.download(sketchName, language, code);
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

  const renderCode = () => (
    <TextEditorContainer
      key={programid}
      viewMode={viewMode}
      updateViewMode={setViewMode}
      screenHeight={screenHeight}
      screenWidth={screenWidth}
      theme={theme}
      viewOnly={viewOnly}
      program={programid}
      sketchName={sketchName}
      vlanguage={language}
      handleDownload={handleDownload}
      handleSave={handleSave}
      saveText={saveText}
      vthumbnail={thumbnail}
    />
  );

  const renderOutput = () => (
    <OutputContainer
      viewMode={viewMode}
      updateViewMode={setViewMode}
      isSmall={screenWidth <= EDITOR_WIDTH_BREAKPOINT}
      viewOnly={viewOnly}
      vLanguage={language}
      code={code}
      program={programid}
    />
  );

  const renderCodeAndOutput = () => (
    <SplitPane
      resizerStyle={{
        height: '67px',
        borderLeft: '2px solid #333',
        borderRight: '2px solid #333',
        width: '10px',
      }}
      pane1Style={pane1Style}
      // functions called when you start and finish a drag
      // removes and re-addsthe transition effect on the first panel when manually resizing
      onDragStarted={() => changePane1Style({})}
      onDragFinished={() => changePane1Style({ transition: 'width .5s ease' })}
      split="vertical" // the resizer is a vertical line (horizontal means resizer is a horizontal bar)
      // minimum size of code is 33% of the remaining screen size
      minSize={(panelOpen ? screenWidth - PANEL_SIZE : screenWidth) * 0.33}
      // max size of code is 75% of the remaining screen size
      maxSize={(panelOpen ? screenWidth - PANEL_SIZE : screenWidth) * 0.75}
      // the initial size of the text editor section
      size={((panelOpen ? screenWidth - PANEL_SIZE : screenWidth) / 5) * 3}
      allowResize
    >
      {renderCode()}
      {renderOutput()}
    </SplitPane>
  );

  const codeStyle = {
    width: screenWidth - (left || 0),
    height: screenHeight,
  };

  switch (viewMode) {
  case CODE_ONLY:
    return <div style={codeStyle}>{renderCode()}</div>;
  case OUTPUT_ONLY:
    return <div style={codeStyle}>{renderOutput()}</div>;
  default:
    return renderCodeAndOutput();
  }
};

export default EditorAndOutput;
