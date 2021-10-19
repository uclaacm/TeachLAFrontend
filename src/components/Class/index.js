import React from 'react';
import { Link } from "react-router-dom";

import * as fetch from '../../lib/fetch.js';
import ClassInfoBox from './components/ClassInfoBox';
import OpenPanelButtonContainer from '../common/containers/OpenPanelButtonContainer';
import '../../styles/Classes.scss';
import '../../styles/ClassPage.scss';
import LoadingPage from '../common/LoadingPage';
import { Redirect } from 'react-router-dom';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import ConfirmLeaveModalContainer from '../Classes/containers/ConfirmLeaveModalContainer';
import Error from '../Error';
// For sketches list
import { getInstructorString } from '../../util/classes';
import SketchBox from '../common/SketchBox';
import '../../styles/SketchBox.scss';
import { ThumbnailArray } from '../../constants';
import { enrichWithLanguageData } from '../../util/languages/languages';
import CodeDownloader from '../../util/languages/CodeDownloader';
import CreateSketchModalContainer from './containers/CreateSketchModalContainer';

const SKETCHES_ROW_PADDING = 100;
const SKETCH_WIDTH = 220;

class ClassPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      error: '',
      confirmLeaveModalOpen: false,
      createSketchModalOpen: false,
      isInstr: false,
    };
  }

  componentDidMount = async () => {
    // Don't try to load class if there's no cid.
    if (this.props.cid === '') {
      return;
    }

    let data = {
      uid: this.props.uid,
      cid: this.props.cid,
    };
    if (this.props.classData && this.props.classData.programData !== null) {
      this.setState({
        loaded: true,
        isInstr: this.props.classData.instructors.some((instrID) => instrID === this.props.uid),
      });
      return;
    }

    console.log('about to get class with this data: ' + JSON.stringify(data));
    try {
      fetch
        .getClass(data, true, true)
        .then((res) => {
          if (!res.ok) throw new Error(`Error loading this class! Got status ${res.status}`);
          return res.classData;
        })
        .then((json) => {
          const isInstr = json.instructors.some((instrID) => instrID === this.props.uid);
          if (isInstr) {
            this.props.addInstrClass(this.props.cid, {
              ...json,
              programData: enrichWithLanguageData(json.programData || []),
            });
          } else {
            this.props.addStudentClass(this.props.cid, {
              ...json,
              programData: enrichWithLanguageData(json.programData || []),
            });
          }

          this.setState({
            loaded: true,
            isInstr,
          });
        })
        .catch((err) => {
          this.setState({
            error: "Couldn't load your class. Please try again later.",
            loaded: true,
          });
          console.log(err);
        });
    } catch (err) {
      this.setState({
        loaded: true,
      });
      console.log(err);
    }
  };

  setCreateSketchModalOpen = (val) => {
    this.setState({ createSketchModalOpen: val });
  };

  setConfirmLeaveModalOpen = (val) => {
    this.setState({ confirmLeaveModalOpen: val });
  };

  // Don't allow last instructor to leave class.
  canLeaveClass = () => {
    return !this.state.isInstr || this.props.classData.instructors.length > 1;
  };

  renderConfirmLeaveModal = () => {
    return this.canLeaveClass() ? (
      <ConfirmLeaveModalContainer
        isOpen={this.state.confirmLeaveModalOpen}
        onClose={() => this.setConfirmLeaveModalOpen(false)}
        className={this.props.classData.name}
        cid={this.props.cid}
        inClass={true}
      />
    ) : (
      ''
    );
  };

  renderCreateSketchModal = () => {
    return (
      <CreateSketchModalContainer
        isOpen={this.state.createSketchModalOpen}
        onClose={() => this.setCreateSketchModalOpen(false)}
        wid={this.props.classData.wid}
      />
    );
  };

  renderHeader = () => {
    const leaveButton = this.canLeaveClass() ? (
      <Button
        className="ml-auto mr-2"
        size="lg"
        onClick={() => this.setConfirmLeaveModalOpen(true)}
      >
        <FontAwesomeIcon icon={faSignOutAlt} /> Leave Class
      </Button>
    ) : (
      ''
    );

    return (
      <div className="classes-header">
        <OpenPanelButtonContainer />
        <Link
          to={{ pathname: "/classes" }}
          className="btn btn-secondary btn-lg btn-block back-btn"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        <div className="classes-header-text">{this.props.classData.name}</div>
        {leaveButton}
      </div>
    );
  };

  renderClassInfo = () => {
    const instString = getInstructorString(this.props.classData.instructors, this.props.classData.userData);
    return (
      <React.Fragment>
        <ClassInfoBox title={'Instructors'} content={instString} />
        {
          // Add this in once description is added to back-end
          /* <ClassInfoBox
          title={'Description'}
          content={this.props.description}
        /> */
        }
      </React.Fragment>
    );
  };

  renderStudentList = () => {
    return this.state.isInstr ? (
      <ClassInfoBox
        title={'Students'}
        content={
          this.props.classData.students
            ? this.props.classData.students.map((student) => (this.props.classData.userData[student] || {}).displayName).join(', ')
            : 'No students enrolled.'
        }
      />
    ) : (
      ''
    );
  };

  // Start of sketches list stuff -- it should probably be moved out of here
  getThumbnailSrc = (val) => {
    if (val === undefined || val === '' || val >= ThumbnailArray.length || val < 0) {
      return ThumbnailArray[0];
    }
    return ThumbnailArray[val];
  };

  renderSketchList = () => {
    let newList = this.props.classData.programData?.concat([]) || [];
    newList.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name === b.name) return 0;
      else return 1;
    });
    let sketchList = [];
    newList.forEach(({ uid, name, language, thumbnail, code }) => {
      sketchList.push(
        <SketchBox
          key={uid}
          img={this.getThumbnailSrc(thumbnail)}
          icon={language.icon}
          name={name}
          downloadFunc={() => {
            CodeDownloader.download(name, language, code);
          }}
          pathname={this.state.isInstr ? '/editor' : `/p/${uid}`}
        />,
      );
    });
    // Button for instructors to add a sketch to the class.
    if (this.state.isInstr) {
      sketchList.push(
        <div
          key="add-sketch"
          className="add-sketch-box sketch-box"
          onClick={() => this.setCreateSketchModalOpen(true)}
        >
          <div className="add-sketch-box-body sketch-box-body">
            <FontAwesomeIcon className="fa-2x add-sketch-plus" icon={faPlus} />
          </div>
          <div className="fa-lg">
            <b>Add a sketch</b>
          </div>
        </div>,
      );
    }
    let numSketchesPerRow = Math.floor(
      (this.props.calculatedWidth - SKETCHES_ROW_PADDING) / SKETCH_WIDTH,
    );
    let rows = [];
    let originalLength = sketchList.length;
    for (let i = 0; i < originalLength / numSketchesPerRow; i++) {
      rows.push(
        <div className="class-sketches-grid-row" key={i}>
          {sketchList.splice(0, numSketchesPerRow)}
        </div>,
      );
    }
    let sketchesDisplay = <div className="class-sketches-grid">{rows}</div>;
    return <ClassInfoBox title={'Sketches'} content={sketchesDisplay} />;
  };

  renderContent = () => {
    return (
      <div className="class-content-container">
        {this.renderClassInfo()}
        {this.renderStudentList()}
        {this.renderSketchList()}
        {this.renderConfirmLeaveModal()}
        {this.renderCreateSketchModal()}
      </div>
    );
  };

  render() {
    // If no class selected, go back to classes page.
    if (this.props.cid === '') {
      return <Redirect to="/classes" />;
    }

    if (this.state.error) {
      return <Error errorMsg={this.state.error} isValidUser={true} returnTo="/classes" />;
    }

    if (!this.state.loaded) {
      return <LoadingPage />;
    }

    const containerStyle = {
      width: this.props.calculatedWidth,
      height: this.props.screenHeight,
    };

    return (
      <div className="classes-container" style={containerStyle}>
        {this.renderHeader()}
        {this.renderContent()}
      </div>
    );
  }
}

export default ClassPage;
