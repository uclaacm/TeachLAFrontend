import { faPlay, faTerminal } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import { OUTPUT_ONLY } from '../../constants';
import OpenPanelButtonContainer from '../common/containers/OpenPanelButtonContainer';
import ViewportAwareButton from '../common/ViewportAwareButton';
import EditorRadio from '../TextEditor/components/EditorRadio';

/** --------Props--------
 * None
 */

const Output = React.memo(
  ({
    viewMode,
    viewOnly,
    screenHeight,
    vLanguage,
    language,
    code,
    runResult,
    updateViewMode,
    isSmall,
  }) => {
    const [counter, setCounter] = useState(0);
    const [run, setRun] = useState(0);
    const [showConsole, setShowConsole] = useState(true);
    const [firstLoad, setFirstLoad] = useState(true);

    useEffect(() => {
      setFirstLoad(false);
    }, []);

    const renderOpenPanelButton = () => viewMode === OUTPUT_ONLY && <OpenPanelButtonContainer />;

    const renderIframe = (getSrcDoc) => {
      // check if getsrcdoc is a function
      if (!getSrcDoc && {}.toString.call(getSrcDoc) === '[object Function]') {
        // console.log('Null src doc function found');
        return null;
      }

      return (
        <iframe
          id={`${counter} ${run}`}
          key={`${counter} ${run}`}
          className="editor-output-iframe"
          style={{ height: `${screenHeight - 61}px` }}
          srcDoc={getSrcDoc()}
          src=""
          title="output-iframe"
          onLoad={() => {}}
        />
      );
    };

    const renderOutput = () => {
      const lang = viewOnly ? vLanguage : language;
      const runRes = viewOnly ? code : runResult;

      if (firstLoad) {
        return null;
      }

      // if there's nothing to run, don't render an output
      if (!runRes || !runRes.length) {
        return null;
      }

      const srcDocFunc = () => lang.render(runRes, showConsole);
      return renderIframe(srcDocFunc);
    };

    const renderRadio = () =>
      viewMode === OUTPUT_ONLY && (
        <div style={{ marginLeft: 'auto' }}>
          <EditorRadio viewMode={viewMode} updateViewMode={updateViewMode} isSmall={isSmall} />
        </div>
      );

    const toggleConsole = () => {
      setShowConsole((prevShowConsole) => !prevShowConsole);
    };

    const renderConsoleButton = () => (
      <Button
        className="mx-2"
        color={showConsole ? 'danger' : 'primary'}
        onClick={toggleConsole}
        title={showConsole ? 'Hide Console' : 'Show Console'}
        size="lg"
      >
        <FontAwesomeIcon icon={faTerminal} />
      </Button>
    );

    const runCode = () => {
      setRun((prevRun) => prevRun + 1);
    };

    const renderBanner = () => (
      <div className="editor-output-banner">
        {renderOpenPanelButton()}
        <div style={{ flex: '1 1 auto' }}> </div> {/* whitespace */}
        {renderRadio()}
        {renderConsoleButton()}
        <ViewportAwareButton
          className="mx-2"
          color="primary"
          size="lg"
          onClick={runCode}
          isSmall={isSmall}
          icon={<FontAwesomeIcon icon={faPlay} />}
          text="Run"
        />
      </div>
    );

    return (
      <div className="editor-output">
        {renderBanner()}
        <div>{renderOutput()}</div>
      </div>
    );
  },
);

export default Output;
