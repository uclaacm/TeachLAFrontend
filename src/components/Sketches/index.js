import '../../styles/Sketches.scss';

import { faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import React from 'react';
import { Button } from 'reactstrap';
import { ThumbnailArray } from '../../constants';
import CodeDownloader from '../../util/languages/CodeDownloader';
import OpenPanelButtonContainer from '../common/containers/OpenPanelButtonContainer';
import SketchBox from '../common/SketchBox';
import ConfirmDeleteModalContainer from './containers/ConfirmDeleteModalContainer';
import CreateSketchModalContainer from './containers/CreateSketchModalContainer';
import EditSketchModalContainer from './containers/EditSketchModalContainer';

const ROW_PADDING = 100;
const SKETCH_WIDTH = 220;

class Sketches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDeleteModalOpen: false,
      createSketchModalOpen: false,
      editSketchModalOpen: false,
      selectedSketch: '',
      selectedImg: '',
      selectedLang: '',
      selectedKey: '',
    };
  }

  setCreateSketchModalOpen = (val) => {
    this.setState({ createSketchModalOpen: val });
  };

  setConfirmDeleteModalOpen = (val, sketch, key) => {
    this.setState({ confirmDeleteModalOpen: val, selectedSketch: sketch, selectedKey: key });
  };

  setEditSketchModalOpen = (val, sketch, img, lang, key) => {
    this.setState({
      editSketchModalOpen: val,
      selectedSketch: sketch,
      selectedImg: img,
      selectedLang: lang,
      selectedKey: key,
    });
  };

  setProgram = (name) => {
    const { uid, setMostRecentProgram } = this.props;

    setMostRecentProgram(name, uid);
  };

  renderHeader = () => (
    <div className="sketches-header">
      <OpenPanelButtonContainer />
      <div className="sketches-header-text">Files</div>
      <Button
        className="ml-auto mr-2"
        color="success"
        size="lg"
        onClick={() => this.setCreateSketchModalOpen(true)}
      >
        <FontAwesomeIcon icon={faFile} />
        {' '}
        Create File
      </Button>
    </div>
  );

  getThumbnailSrc = (val) => {
    if (val === undefined || val === '' || val >= ThumbnailArray.length || val < 0) {
      return ThumbnailArray[0];
    }
    return ThumbnailArray[val];
  };

  renderSketches = () => {
    const { programs } = this.props;

    const newList = programs.concat([]);
    if (newList.size === 0) {
      return (
        <div>
          <div className="no-sketches-container">
            <h2>There&apos;s nothing here! Why don&apos;t you try creating a file?</h2>
            <br />
            <p>
              <Button color="success" size="lg" onClick={() => this.setCreateSketchModalOpen(true)}>
                Create A File
              </Button>
            </p>
          </div>
        </div>
      );
    }
    const sketches = [];
    newList.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name === b.name) return 0;
      // if (a.name > b.name) return 1;
      return 1;
    });
    newList.forEach(({
      key, name, language, thumbnail, code,
    }) => {
      sketches.push(
        <SketchBox
          img={this.getThumbnailSrc(thumbnail)}
          icon={language.icon}
          name={name}
          key={key}
          deleteFunc={() => {
            this.setConfirmDeleteModalOpen(true, name, key);
          }}
          downloadFunc={() => {
            CodeDownloader.download(name, language, code);
          }}
          editFunc={() => {
            this.setEditSketchModalOpen(
              true,
              name,
              this.getThumbnailSrc(thumbnail),
              language.display,
              key,
            );
          }}
          redirFunc={() => {
            this.setProgram(key);
          }}
        />,
      );
    });

    const { calculatedWidth } = this.props;
    const numSketchesPerRow = Math.floor((calculatedWidth - ROW_PADDING) / SKETCH_WIDTH);
    const rows = [];
    const originalLength = sketches.length;
    for (let i = 0; i < originalLength / numSketchesPerRow; i++) {
      rows.push(
        <div className="sketches-grid-row" key={i}>
          {sketches.splice(0, numSketchesPerRow)}
        </div>,
      );
    }

    return <div className="sketches-grid">{rows}</div>;
  };

  renderConfirmDeleteModal = () => {
    const { confirmDeleteModalOpen, selectedSketch, selectedKey } = this.state;
    return (
      <ConfirmDeleteModalContainer
        isOpen={confirmDeleteModalOpen}
        onClose={() => this.setState({ confirmDeleteModalOpen: false })}
        sketchName={selectedSketch}
        sketchKey={selectedKey}
      />
    );
  };

  renderCreateSketchModal = () => {
    const { createSketchModalOpen } = this.state;
    return (
      <CreateSketchModalContainer
        isOpen={createSketchModalOpen}
        onClose={() => this.setState({ createSketchModalOpen: false })}
      />
    );
  };

  renderEditSketchModal = () => {
    const {
      editSketchModalOpen, selectedSketch, selectedImg, selectedLang, selectedKey,
    } = this.state;

    return (
      <EditSketchModalContainer
        isOpen={editSketchModalOpen}
        onClose={() => this.setState({ editSketchModalOpen: false })}
        sketchName={selectedSketch}
        sketchImg={selectedImg}
        sketchLang={selectedLang}
        sketchKey={selectedKey}
      />
    );
  };

  renderContent = () => (
    <>
      {this.renderHeader()}
      {this.renderSketches()}
      {this.renderCreateSketchModal()}
      {this.renderConfirmDeleteModal()}
      {this.renderEditSketchModal()}
    </>
  );

  render() {
    const { calculatedWidth, screenHeight } = this.props;
    const containerStyle = {
      width: calculatedWidth,
      height: screenHeight,
    };

    return (
      <div className="sketches-container" style={containerStyle}>
        {this.renderContent()}
      </div>
    );
  }
}

export default Sketches;
