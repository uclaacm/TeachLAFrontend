import {
  faDownload, faSave, faShare, faCodeBranch,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import CodeMirror, { ViewUpdate } from '@uiw/react-codemirror';
import ReactModal from 'react-modal';
import { Navigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import { EDITOR_WIDTH_BREAKPOINT, ThumbnailArray } from '../../../constants';
import { constructShareableSketchURL } from '../../../lib/sketch';
import { createSketch } from '../../../lib/fetch';
import OpenPanelButtonContainer from '../../common/containers/OpenPanelButtonContainer';
import ViewportAwareButton from '../../common/ViewportAwareButton';
import DropdownButtonContainer from '../containers/DropdownButtonContainer';
import EditorRadio from './EditorRadio';
import ShareSketchModal from './ShareSketchModal';
import { python } from '@codemirror/lang-python';
import { javascript } from '@codemirror/lang-javascript';
import { bbedit } from '@uiw/codemirror-theme-bbedit';
import { sublime } from '@uiw/codemirror-theme-sublime';

/** ----------Props--------
 * None
 */

const TextEditor = (props) => {
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

  const onLeave = async (ev: BeforeUnloadEvent) => {
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

  const updateCode = (newCode: string, _viewUpdate: ViewUpdate) => {
    // if the code's not yet dirty, and the old code is different from the new code, make it dirty
    if (!dirty && code !== newCode) {
      dirtyCode(mostRecentProgram);
    }
    setProgramCode(mostRecentProgram, newCode);
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
      createSketch(data)
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

  const getCMTheme = (newTheme: string) => {
    switch (newTheme) {
    case 'light':
      return bbedit;
    case 'dark':
    default:
      return sublime;
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
          src={`/img/sketch-thumbnails/${thumbnailArray}.svg`}
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
    return <Navigate to="/sketches" />;
  }

  const cmExtensions = [];

  switch (viewMode ? vlanguage.codemirror : language.codemirror) {
  case 'python': cmExtensions.push(python()); break;
  case 'jsx': cmExtensions.push(javascript({ jsx: true })); break;
  }

  return (
    <div className={`theme-${theme}`} style={{ height: '100%' }}>
      <div className="code-section">
        {renderBanner()}
        {renderForkModal()}
        <ShareSketchModal
          shareUrl={constructShareableSketchURL(mostRecentProgram)}
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
            value={code}
            theme={getCMTheme(theme)}
            onChange={updateCode}
            extensions={cmExtensions}
          />
        </div>
      </div>
    </div>
  );
};
export default TextEditor;
