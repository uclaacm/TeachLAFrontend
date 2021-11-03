import { faDownload, faSave, faShare, faCodeBranch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import { Redirect } from 'react-router-dom';
import { Button } from 'reactstrap';
import { EDITOR_WIDTH_BREAKPOINT } from '../../../constants';
import skt from '../../../lib';
import * as fetch from '../../../lib/fetch.js';

import DropdownButtonContainer from '../containers/DropdownButtonContainer';
import OpenPanelButtonContainer from '../../common/containers/OpenPanelButtonContainer';
import ViewportAwareButton from '../../common/ViewportAwareButton.js';
import { SketchThumbnailArray } from '../../Sketches/constants';
import EditorRadio from './EditorRadio.js';
import ShareSketchModal from './ShareSketchModal';

let CodeMirror = null;
if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
  // import {Controlled as CodeMirror} from 'react-codemirror2'
  CodeMirror = require('react-codemirror2').Controlled;
  require('codemirror/mode/javascript/javascript.js');
  require('codemirror/mode/htmlmixed/htmlmixed.js');
  require('codemirror/mode/python/python.js');
  require('codemirror/mode/jsx/jsx.js');
  require('codemirror/mode/clike/clike.js');
}
/** ----------Props--------
 * None
 */

function TextEditor(props) {
  const [codeMirrorInstance, setCodeMirrorInstance] = useState(null);
  const [currentLine, setCurrentLine] = useState(0);
  const [sketch, setSketch] = useState(null);
  const [showForkModal, setShowForkModal] = useState(false);
  const [forking, setForking] = useState(false);
  const [forked, setForked] = useState(false);
  const [redirectToSketch, setRedirectToSketch] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [error, setError] = useState(null);

  const {
    dirty,
    mostRecentProgram,
    code,
    uid,
    dirtyCode,
    setProgramCode,
    vthumbnail,
    vlanguage,
    sketchName,
    addProgram,
    thumbnail,
    viewMode,
    viewOnly,
    updateViewMode,
    screenHeight,
    screenWidth,
    theme,
    language,
    handleSave,
    handleDownload,
    saveText,
  } = props;

  //= =============React Lifecycle Functions===================//

  useEffect(() => {
    window.addEventListener('beforeunload', onLeave);
    window.addEventListener('close', onLeave);

    return () => {
      window.removeEventListener('beforeunload', onLeave);
      window.removeEventListener('close', onLeave);
    };
  }, []);

  const openForkModal = () => {
    setShowForkModal(true);
  };

  const closeForkModal = () => {
    setShowForkModal(false);
  };

  const checkDirty = async () => {
    if (!dirty) {
      return;
    }

    try {
      const programToUpdate = {};
      programToUpdate[mostRecentProgram] = {
        code: code,
      };

      await fetch.updatePrograms(uid, programToUpdate);
      // TODO: add functionality to be able to tell whether the fetch failed
    } catch (err) {
      console.log(err);
    }
  };

  const onLeave = async (ev) => {
    if (dirty) {
      ev.returnValue = '';
    }
    return ev;
  };

  // fix this

  const updateCode = (editor, data, newCode) => {
    // if the code's not yet dirty, and the old code is different from the new code, make it dirty
    if (!dirty && code !== newCode) {
      dirtyCode(mostRecentProgram);
    }
    setProgramCode(mostRecentProgram, newCode);
  };

  const setCurrentLineManual = (cm) => {
    const { line } = cm.getCursor();
    if (codeMirrorInstance) {
      // removeLineClass removes the back highlight style from the last selected line
      codeMirrorInstance.removeLineClass(currentLine, 'wrap', 'selected-line');
      // addLineClass adds the style to the newly selected line
      codeMirrorInstance.addLineClass(line, 'wrap', 'selected-line');
    }
    setCurrentLineManual(line);
  };

  const renderForkModal = () => (
    <ReactModal
      isOpen={showForkModal}
      onRequestClose={closeForkModal}
      className="fork-modal"
      overlayClassName="profile-image-overlay"
      ariaHideApp={false}
    >
      <h1 className="text-center">Fork This Sketch</h1>
      {!(forking || forked) && (
        <p className="text-center">Would you like to create your own copy of this sketch?</p>
      )}
      {forking ? (
        <p className="text-center">Forking...</p>
      ) : forked ? (
        <div>
          <p className="text-center">Sketch forked! Go to your sketches to see your new copy!</p>
          <Button color="danger" size="lg" onClick={closeForkModal} block>
            Close
          </Button>
          <Button color="success" size="lg" onClick={redirectSketch} block>
            Go to Sketches
          </Button>
        </div>
      ) : (
        <div className="text-center">
          <Button color="danger" size="lg" onClick={closeForkModal} block>
            Cancel
          </Button>
          <Button color="success" size="lg" onClick={handleFork} block>
            Fork
          </Button>
        </div>
      )}
    </ReactModal>
  );

  const handleFork = async () => {
    setForking(true);
    const data = {
      uid: uid,
      thumbnail: vthumbnail,
      language: (vlanguage || {}).value,
      name: sketchName,
      code: code,
    };

    try {
      fetch
        .createSketch(data)
        .then((res) => {
          if (!res.ok) throw new Error(`Failed to create sketch! Got status ${res.status}.`);
          return res.json();
        })
        .then((json) => {
          const { uid, ...programData } = json;
          setForking(false);
          setForked(true);
          addProgram(uid, programData || {});
        })
        .catch((err) => {
          setError('Failed to create sketch, please try again later');
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const redirectSketch = () => {
    closeForkModal();
    setRedirectToSketch(true);
  };

  const toggleShareModal = () => {
    setShowShareModal(!showShareModal);
    // original code: setState((prevState) => ({ showShareModal: !prevState.showShareModal }));
  };

  /**
   * returns a theme string for the CodeMirror editor, based off of the app's current theme
   * @param {string} theme - the app's current theme
   * @returns {string} the codemirror theme - see https://codemirror.net/demo/theme.html for more info
   */

  const getCMTheme = (theme) => {
    switch (theme) {
      case 'light':
        return 'duotone-light';
      case 'dark':
      default:
        return 'material';
    }
  };

  const renderDropdown = () => <DropdownButtonContainer />;

  const renderSketchName = () => <div className="program-sketch-name">{sketchName}</div>;

  const renderBanner = () => {
    const thumbnail = SketchThumbnailArray[viewOnly ? vthumbnail : thumbnail];
    return (
      <div className="code-section-banner">
        <OpenPanelButtonContainer />
        <img
          className="program-sketch-thumbnail"
          src={`${process.env.PUBLIC_URL}/img/sketch-thumbnails/${thumbnail}.svg`}
          alt="sketch thumbnail"
        />
        {viewOnly ? renderSketchName() : renderDropdown()}
        <div style={{ marginLeft: 'auto', marginRight: '.5rem' }}>
          <EditorRadio
            viewMode={viewMode}
            updateViewMode={updateViewMode}
            isSmall={screenWidth <= EDITOR_WIDTH_BREAKPOINT}
          />
        </div>
        {viewOnly ? (
          uid ? (
            <ViewportAwareButton
              size="lg"
              onClick={openForkModal}
              isSmall={screenWidth <= EDITOR_WIDTH_BREAKPOINT}
              icon={<FontAwesomeIcon icon={faCodeBranch} />}
              text="Fork"
            />
          ) : null
        ) : (
          <ViewportAwareButton
            className="mx-2"
            color="success"
            size="lg"
            onClick={handleSave}
            isSmall={screenWidth <= EDITOR_WIDTH_BREAKPOINT}
            icon={<FontAwesomeIcon icon={faSave} />}
            text={saveText}
          />
        )}
        {!viewOnly && (
          <ViewportAwareButton
            className="mx-2"
            color="primary"
            size="lg"
            onClick={toggleShareModal}
            isSmall={screenWidth <= EDITOR_WIDTH_BREAKPOINT}
            icon={<FontAwesomeIcon icon={faShare} />}
            text="Share"
          />
        )}
        {
          <Button className="mx-2" color="success" size="lg" onClick={handleDownload}>
            <FontAwesomeIcon icon={faDownload} />
          </Button>
        }
      </div>
    );
  };

  if (redirectToSketch === true) {
    return <Redirect to="/sketches" />;
  }
  // json required by CodeMirror
  const options = {
    mode: viewOnly ? vlanguage.codemirror : language.codemirror,
    theme: getCMTheme(theme),
    lineNumbers: true, // text editor has line numbers
    /**
     * text editor does not overflow in the x direction, uses word wrap
     *    (NOTE: it's like MO Word wrapping, so words are not cut in the middle,
     *    if a word overlaps, the whole word is brought to the next line)
     */
    lineWrapping: true,
    indentWithTabs: true,
  };

  return (
    <div className={`theme-${theme}`} style={{ height: '100%' }}>
      <div className="code-section">
        {renderBanner()}
        {renderForkModal()}
        <ShareSketchModal
          shareUrl={skt.constructShareableSketchURL(mostRecentProgram)}
          showModal={showShareModal}
          toggleModal={toggleShareModal}
        />
        <div
          className="text-editor-container"
          style={{
            height: screenHeight - 61 - 20,
            minHeight: screenHeight - 61 - 20,
            maxHeight: screenHeight - 61 - 20,
          }}
        >
          <CodeMirror
            editorDidMount={(codeMirrorInstance) => {
              codeMirrorInstance.refresh();
              setCodeMirrorInstance(codeMirrorInstance);
            }}
            value={code}
            lineWrapping
            indentWithTabs
            options={options}
            onCursor={(cm) => {
              setCurrentLine(cm);
            }}
            onBeforeChange={updateCode}
            onChange={updateCode}
          />
        </div>
      </div>
    </div>
  );
}

export default TextEditor;
