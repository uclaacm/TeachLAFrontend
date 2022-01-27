import React from 'react';
import SplitPane from 'react-split-pane';
import {
  EDITOR_WIDTH_BREAKPOINT, CODE_ONLY, OUTPUT_ONLY, PANEL_SIZE,
} from '../../constants';
import CodeDownloader from '../../util/languages/CodeDownloader';
import OutputContainer from '../Output/OutputContainer';
import TextEditorContainer from '../TextEditor/containers/TextEditorContainer';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/duotone-light.css';
import '../../styles/CustomCM.scss';
import '../../styles/Resizer.scss';
import '../../styles/Editor.scss';

const EditorAndOutput = function (props) {
  const {
    sketchName,
    language,
    code,
    pane1Style,
    changePane1Style,
    panelOpen,
    screenWidth,
    mostRecentProgram,
    viewMode,
    updateViewMode,
    screenHeight,
    theme,
    viewOnly,
    programid,
    handleSave,
    saveText,
    thumbnail,
    left,
  } = props;
  const handleDownload = () => {
    CodeDownloader.download(sketchName, language, code);
  };

  const renderCode = () => (
    <TextEditorContainer
      key={mostRecentProgram}
      viewMode={viewMode}
      updateViewMode={updateViewMode}
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
      updateViewMode={updateViewMode}
      isSmall={screenWidth <= EDITOR_WIDTH_BREAKPOINT}
      viewOnly={viewOnly}
      vLanguage={language}
      code={code}
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
