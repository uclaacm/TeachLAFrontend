import React from 'react';
import SplitPane from 'react-split-pane';
import { EDITOR_WIDTH_BREAKPOINT, CODE_ONLY, OUTPUT_ONLY, PANEL_SIZE } from '../../constants';
import CodeDownloader from '../../util/languages/CodeDownloader';
import OutputContainer from '../Output/OutputContainer.js';
import TextEditorContainer from '../TextEditor/containers/TextEditorContainer.js';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/duotone-light.css';
import '../../styles/CustomCM.scss';
import '../../styles/Resizer.scss';
import '../../styles/Editor.scss';

function EditorAndOutput(props) {
  const handleDownload = () => {
    CodeDownloader.download(props.sketchName, props.language, props.code);
  };

  const renderCodeAndOutput = () => (
    <SplitPane
      resizerStyle={{
        height: '67px',
        borderLeft: '2px solid #333',
        borderRight: '2px solid #333',
        width: '10px',
      }}
      pane1Style={props.pane1Style}
      // functions called when you start and finish a drag
      // removes and re-addsthe transition effect on the first panel when manually resizing
      onDragStarted={() => props.changePane1Style({ pane1Style: {} })}
      onDragFinished={() =>
        props.changePane1Style({ pane1Style: { transition: 'width .5s ease' } })
      }
      split="vertical" // the resizer is a vertical line (horizontal means resizer is a horizontal bar)
      minSize={(props.panelOpen ? props.screenWidth - PANEL_SIZE : props.screenWidth) * 0.33} // minimum size of code is 33% of the remaining screen size
      maxSize={(props.panelOpen ? props.screenWidth - PANEL_SIZE : props.screenWidth) * 0.75} // max size of code is 75% of the remaining screen size
      size={((props.panelOpen ? props.screenWidth - PANEL_SIZE : props.screenWidth) / 5) * 3} // the initial size of the text editor section
      allowResize
    >
      {renderCode()}
      {renderOutput()}
    </SplitPane>
  );

  const renderCode = () => (
    <TextEditorContainer
      key={props.mostRecentProgram}
      viewMode={props.viewMode}
      updateViewMode={props.updateViewMode}
      screenHeight={props.screenHeight}
      screenWidth={props.screenWidth}
      theme={props.theme}
      viewOnly={props.viewOnly}
      program={props.programid}
      sketchName={props.sketchName}
      vlanguage={props.language}
      handleDownload={handleDownload}
      handleSave={props.handleSave}
      saveText={props.saveText}
      vthumbnail={props.thumbnail}
    />
  );

  const renderOutput = () => (
    <OutputContainer
      viewMode={props.viewMode}
      updateViewMode={props.updateViewMode}
      isSmall={props.screenWidth <= EDITOR_WIDTH_BREAKPOINT}
      viewOnly={props.viewOnly}
      vLanguage={props.language}
      code={props.code}
    />
  );

  const codeStyle = {
    width: props.screenWidth - (props.left || 0),
    height: props.screenHeight,
  };

  switch (props.viewMode) {
    case CODE_ONLY:
      return <div style={codeStyle}>{renderCode()}</div>;
    case OUTPUT_ONLY:
      return <div style={codeStyle}>{renderOutput()}</div>;
    default:
      return renderCodeAndOutput();
  }
}

export default EditorAndOutput;
