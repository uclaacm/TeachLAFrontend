import {
  faDownload, faSave, faShare, faCodeBranch,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import ReactModal from 'react-modal';
import { Redirect } from 'react-router-dom';
import { Button } from 'reactstrap';
import { EDITOR_WIDTH_BREAKPOINT, ThumbnailArray } from '../../../constants';
import skt from '../../../lib';
import * as fetch from '../../../lib/fetch';
import OpenPanelButtonContainer from '../../common/containers/OpenPanelButtonContainer';
import ViewportAwareButton from '../../common/ViewportAwareButton';
import DropdownButtonContainer from '../containers/DropdownButtonContainer';
import EditorRadio from './EditorRadio';
import ShareSketchModal from './ShareSketchModal';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/python/python';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/mode/clike/clike';

/** ----------Props--------
 * None
 */

const TextEditor = function (props) {
  const [codeMirrorInstance, setCodeMirrorInstance] = useState(null);
  const [currentLine, setCurrentLine] = useState(0);
  const [showForkModal, setShowForkModal] = useState(false);
  const [forking, setForking] = useState(false);
  const [forked, setForked] = useState(false);
  const [redirectToSketch, setRedirectToSketch] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const {
    dirty,
    mostRecentProgram,
    code,
    dirtyCode,
    setProgramCode,
    vthumbnail,
    vlanguage,
    sketchName,
    uid,
    theme,
    thumbnail,
    addProgram,
    viewMode,
    viewOnly,
    updateViewMode,
    screenHeight,
    screenWidth,
    language,
    handleSave,
    handleDownload,
    saveText,
  } = props;

  //= =============React Lifecycle Functions====================//

  const onLeave = async (ev) => {
    const newev = ev;
    if (dirty) {
      newev.returnValue = '';
    }
    return newev;
  };

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
    setCurrentLine(line);
  };

  const redirectSketch = () => {
    closeForkModal();
    setRedirectToSketch(true);
  };

  const handleFork = async () => {
    setForking(true);
    const data = {
      uid,
      thumbnail: vthumbnail,
      language: (vlanguage || {}).value,
      name: sketchName,
      code,
    };

    try {
      fetch
        .createSketch(data)
        .then((res) => {
          if (!res.ok) throw new Error(`Failed to create sketch! Got status ${res.status}.`);
          return res.json();
        })
        .then((json) => {
          const { uid2, ...programData } = json;
          setForking(false);
          setForked(true);
          addProgram(uid2, programData || {});
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (err) {
      console.error(err);
    }
  };

  const renderForkModalActions = () => {
    if (forking) {
      <p className="text-center">Forking...</p>;
    } else if (forked) {
      <div>
        <p className="text-center">Sketch forked! Go to your sketches to see your new copy!</p>
        <Button color="danger" size="lg" onClick={closeForkModal} block>
          Close
        </Button>
        <Button color="success" size="lg" onClick={redirectSketch} block>
          Go to Sketches
        </Button>
      </div>;
    } else {
      <div className="text-center">
        <Button color="danger" size="lg" onClick={closeForkModal} block>
          Cancel
        </Button>
        <Button color="success" size="lg" onClick={handleFork} block>
          Fork
        </Button>
      </div>;
    }
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
      {renderForkModalActions()}
    </ReactModal>
  );

  const toggleShareModal = () => {
    setShowShareModal(!showShareModal);
  };

  /**
   * returns a theme string for the CodeMirror editor, based off of the app's current theme
   * @param {string} theme - the app's current theme
   * @returns {string} the codemirror theme - see https://codemirror.net/demo/theme.html for more info
   */
  const getCMTheme = (newTheme) => {
    switch (newTheme) {
    case 'light':
      return 'duotone-light';
    case 'dark':
    default:
      return 'material';
    }
  };

  const renderSketchName = () => <div className="program-sketch-name">{sketchName}</div>;

  const renderEditorAction = () => {
    if (viewOnly) {
      if (uid) {
        return (
          <ViewportAwareButton
            size="lg"
            onClick={openForkModal}
            isSmall={screenWidth <= EDITOR_WIDTH_BREAKPOINT}
            icon={<FontAwesomeIcon icon={faCodeBranch} />}
            text="Fork"
          />
        );
      }
    } else {
      return (
        <ViewportAwareButton
          className="mx-2"
          color="success"
          size="lg"
          onClick={handleSave}
          isSmall={screenWidth <= EDITOR_WIDTH_BREAKPOINT}
          icon={<FontAwesomeIcon icon={faSave} />}
          text={saveText}
        />
      );
    }
    return null;
  };

  const renderBanner = () => {
    const thumbnailArray = ThumbnailArray[viewOnly ? vthumbnail : thumbnail];
    return (
      <div className="code-section-banner">
        <OpenPanelButtonContainer />
        <img
          className="program-sketch-thumbnail"
          src={`${process.env.PUBLIC_URL}/img/sketch-thumbnails/${thumbnailArray}.svg`}
          alt="sketch thumbnail"
        />
        {viewOnly ? renderSketchName() : <DropdownButtonContainer />}
        <div style={{ marginLeft: 'auto', marginRight: '.5rem' }}>
          <EditorRadio
            viewMode={viewMode}
            updateViewMode={updateViewMode}
            isSmall={screenWidth <= EDITOR_WIDTH_BREAKPOINT}
          />
        </div>
        {renderEditorAction()}
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
            editorDidMount={(MirrorInstance) => {
              MirrorInstance.refresh();
              setCodeMirrorInstance(MirrorInstance);
            }}
            value={code}
            lineWrapping
            indentWithTabs
            options={options}
            onCursor={(cm) => {
              setCurrentLineManual(cm);
            }}
            onBeforeChange={updateCode}
            onChange={updateCode}
          />
        </div>
      </div>
    </div>
  );
};
export default TextEditor;
