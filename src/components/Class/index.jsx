import { faSignOutAlt, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Button } from 'reactstrap';

import * as fetch from '../../lib/fetch';
import { getInstructorString } from '../../util/classes';
import { enrichWithLanguageData } from '../../util/languages/languages';
import ConfirmLeaveModalContainer from '../Classes/containers/ConfirmLeaveModalContainer';
import OpenPanelButtonContainer from '../common/containers/OpenPanelButtonContainer';
import LoadingPage from '../common/LoadingPage';
import Error from '../Error';
import ClassInfoBox from './components/ClassInfoBox';
import ClassSketchList from './components/ClassSketchList';

// For sketches list
import CreateSketchModalContainer from './containers/CreateSketchModalContainer';

import '../../styles/Classes.scss';
import '../../styles/ClassPage.scss';

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

  componentDidMount() {
    const {
      cid, uid, addInstrClass, addStudentClass,
    } = this.props;

    // Don't try to load class if there's no cid.
    if (cid === '') {
      return;
    }

    const data = {
      uid,
      cid,
    };

    // TODO: Don't re-fetch existing data
    // if (this.props.classData && this.props.classData.programData !== null) {
    //   this.setState({
    //     loaded: true,
    //     isInstr: this.props.classData.instructors.some((instrID) => instrID === this.props.uid),
    //   });
    //   return;
    // }

    // console.log('about to get class with this data: ' + JSON.stringify(data));
    try {
      fetch
        .getClass(data, true, true)
        .then((res) => {
          if (!res.ok) throw new Error(`Error loading this class! Got status ${res.status}`);
          return res.classData;
        })
        .then((json) => {
          const isInstr = json.instructors.some((instrID) => instrID === uid);
          if (isInstr) {
            addInstrClass(cid, {
              ...json,
              programData: enrichWithLanguageData(json.programData || []),
            });
          } else {
            addStudentClass(cid, {
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
          console.error(err);
        });
    } catch (err) {
      this.setState({
        loaded: true,
      });
      console.error(err);
    }
  }

  setCreateSketchModalOpen = (val) => {
    this.setState({ createSketchModalOpen: val });
  };

  setConfirmLeaveModalOpen = (val) => {
    this.setState({ confirmLeaveModalOpen: val });
  };

  // Don't allow last instructor to leave class.
  canLeaveClass = () => {
    const { isInstr } = this.state;
    const { classData } = this.props;
    return !isInstr || classData.instructors.length > 1;
  };

  renderConfirmLeaveModal = () => {
    const { confirmLeaveModalOpen } = this.state;
    const { classData, cid } = this.props;

    return this.canLeaveClass() ? (
      <ConfirmLeaveModalContainer
        isOpen={confirmLeaveModalOpen}
        onClose={() => this.setConfirmLeaveModalOpen(false)}
        className={classData.name}
        cid={cid}
        inClass
      />
    ) : (
      ''
    );
  };

  renderCreateSketchModal = () => {
    const { createSketchModalOpen } = this.state;
    const { classData } = this.props;

    return (
      <CreateSketchModalContainer
        isOpen={createSketchModalOpen}
        onClose={() => this.setCreateSketchModalOpen(false)}
        wid={classData.wid}
      />
    );
  };

  renderHeader = () => {
    const {
      classData: { name },
    } = this.props;
    const leaveButton = this.canLeaveClass() ? (
      <Button
        className="ml-auto mr-2"
        size="lg"
        onClick={() => this.setConfirmLeaveModalOpen(true)}
      >
        <FontAwesomeIcon icon={faSignOutAlt} />
        {' '}
        Leave Class
      </Button>
    ) : (
      ''
    );

    return (
      <div className="classes-header">
        <OpenPanelButtonContainer />
        <Link to={{ pathname: '/classes' }} className="btn btn-secondary btn-lg btn-block back-btn">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        <div className="classes-header-text">{name}</div>
        {leaveButton}
      </div>
    );
  };

  renderClassInfo = () => {
    const { classData } = this.props;
    const instString = getInstructorString(classData.instructors, classData.userData);
    const { wid } = classData;
    return (
      <>
        <ClassInfoBox title="WID">{wid}</ClassInfoBox>
        <ClassInfoBox title="Instructors">{instString}</ClassInfoBox>
        {
          // Add this in once description is added to back-end
          /* <ClassInfoBox
          title={'Description'}
          content={this.props.description}
        /> */
        }
      </>
    );
  };

  renderStudentList = () => {
    const {
      classData: { students, userData },
    } = this.props;
    const { isInstr } = this.state;
    return isInstr ? (
      <ClassInfoBox title="Students">
        {students
          ? students.map((student) => (userData[student] || {}).displayName).join(', ')
          : 'No students enrolled.'}
      </ClassInfoBox>
    ) : (
      ''
    );
  };

  renderSketchList = () => {
    const {
      calculatedWidth,
      classData: { programData },
    } = this.props;
    const { isInstr } = this.state;

    return (
      <ClassInfoBox title="Sketches">
        <ClassSketchList
          calculatedWidth={calculatedWidth}
          isInstr={isInstr}
          programData={programData}
          setCreateSketchModalOpen={this.setCreateSketchModalOpen}
        />
      </ClassInfoBox>
    );
  };

  renderContent = () => (
    <div className="class-content-container">
      {this.renderClassInfo()}
      {this.renderStudentList()}
      {this.renderSketchList()}
      {this.renderConfirmLeaveModal()}
      {this.renderCreateSketchModal()}
    </div>
  );

  render() {
    const { cid, calculatedWidth, screenHeight } = this.props;

    const { error, loaded } = this.state;

    // If no class selected, go back to classes page.
    if (cid === '') {
      return <Navigate to="/classes" />;
    }

    if (error) {
      return <Error errorMsg={error} isValidUser returnTo="/classes" />;
    }

    if (!loaded) {
      return <LoadingPage />;
    }

    const containerStyle = {
      width: calculatedWidth,
      height: screenHeight,
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
