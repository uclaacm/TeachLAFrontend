import React from 'react';
import { ThumbnailArray } from "../../constants";
import * as fetch from "../../lib/fetch.js";
import ClassBox from "./components/ClassBox";
import ConfirmLeaveModalContainer from "./containers/ConfirmLeaveModalContainer";
import CreateClassModalContainer from "./containers/CreateClassModalContainer";
import JoinClassModalContainer from "./containers/JoinClassModalContainer";
import OpenPanelButtonContainer from "../common/containers/OpenPanelButtonContainer";
import '../../styles/ClassBox.scss';
import '../../styles/Classes.scss';
import '../../styles/Login.scss';
import LoadingPage from '../common/LoadingPage';
import { getInstructorString } from '../../util/classes';

import { Button } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus , faKey , faPencilAlt } from "@fortawesome/free-solid-svg-icons";

class Classes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      redirectTo: '',
      confirmLeaveModalOpen: false,
      createClassModalOpen: false,
      joinClassModalOpen: false,
      selectedClass: '',
      selectedImg: '',
      selectedCid: '',
      classCode: '',
    };
  }

  componentDidMount = async () => {
    if (this.props.classesLoaded) {
      // If classes are already loaded, don't fetch them again.
      this.setState({
        loaded: true,
      });
      return;
    }
    // Test classes
    // let studentClasses = [];
    // let instrClasses = [];
    // studentClasses.push(
    //   {
    //     name: "Python Class",
    //     instructors: ["Python Master"],
    //     cid: 2,
    //   }
    // );
    // instrClasses.push(
    //   {
    //     name: "Will's Class",
    //     instructors: ["Will O."],
    //     cid: 1,
    //   }
    // );
    // this.props.loadInstrClasses(instrClasses);
    // this.props.loadStudentClasses(studentClasses);
    // this.props.setClassesLoaded(true);
    // end of test code

    let classObjects = [];
    try {
      // Request all classes concurrently.
      console.log('gonna send requests now!');
      classObjects = await Promise.all(
        this.props.classList.map((cid) => new Promise((resolve, reject) => {
            let data = {
              uid: this.props.uid,
              cid: cid,
            };
            fetch
              .getClass(data, false, true)
              .then((res) => {
                if (!res.ok) throw new Error(`Error loading a class! Got status ${res.status}`);
                console.log("res is:");
                console.log(res);
                resolve(res.classData);
              })
              .catch((err) => {
                this.setState({
                  error: "Failed to load your classes. Please try again later.",
                  loaded: true,
                });
                console.log(err);
                reject(err);
              });
          })),
      );
      console.log('classObjects: ' + JSON.stringify(classObjects));
    } catch (err) {
      this.setState({
        error: 'Failed to load your classes. Please try again later.',
        loaded: true,
      });
      console.log(err);
    }

    // Sort into student and instructor classes
    const studentClasses = [],
      instrClasses = [];
    classObjects.forEach((thisclass) => {
      // TODO: update this line when back-end API is updated
      if (thisclass.instructors.some((instrId) => instrId === this.props.uid)) {
        instrClasses.push(thisclass);
      } else {
        studentClasses.push(thisclass);
      }
    });
    this.props.loadInstrClasses(instrClasses);
    this.props.loadStudentClasses(studentClasses);
    this.props.setClassesLoaded(true);
    this.setState({
      loaded: true,
    });
  };

  setCreateClassModalOpen = (val) => {
    this.setState({ createClassModalOpen: val });
  };

  setJoinClassModalOpen = (val) => {
    this.setState({ joinClassModalOpen: val });
  };

  setConfirmLeaveModalOpen = (val, className, cid) => {
    this.setState({ confirmLeaveModalOpen: val, selectedClass: className, selectedCid: cid });
  };

  switchInstrStudView = () => {
    this.props.setOnInstrView(!this.props.onInstrView);
  };

  renderHeader = () => {
    let buttonText; let 
icon;
    if (this.props.onInstrView) {
      buttonText = 'To Student View';
      icon = faPencilAlt;
    } else {
      buttonText = 'To Instructor View';
      icon = faKey;
    }

    return (
      <div className="classes-header">
        <OpenPanelButtonContainer />
        <div className="classes-header-text">Classes</div>
        <Button className="ml-auto mr-2" size="lg" onClick={() => this.switchInstrStudView()}>
          <FontAwesomeIcon icon={icon} /> 
{' '}
{buttonText}
        </Button>
      </div>
    );
  };

  updateClassCode = (classCode) => {
    this.setState({ classCode });
    console.log(this.state.classCode);
  };

  renderCreateAClass = () => (
      <Button className="class-box join-class" onClick={() => this.setCreateClassModalOpen(true)}>
        <div className="join-class-plus">
          <FontAwesomeIcon className="fa-lg" icon={faPlus} />
        </div>
        <span className="fa-lg join-class-text">
          <b>Create a new class</b>
        </span>
      </Button>
    );

  renderJoinAClass = () => (
      <Button className="class-box join-class" onClick={() => this.setJoinClassModalOpen(true)}>
        <div className="join-class-plus">
          <FontAwesomeIcon className="fa-lg" icon={faPlus} />
        </div>
        <span className="fa-lg join-class-text">
          <b>Join a class</b>
        </span>
      </Button>
    );

  setClass = (key) => {
    this.props.setCurrentClass(key);
  };

  getThumbnailSrc = (val) => {
    if (val === undefined || val === '' || val >= ThumbnailArray.length || val < 0) {
      return ThumbnailArray[0];
    }
    return ThumbnailArray[val];
  };

  renderClassList = () => {
    const classesIn = this.props.onInstrView
      ? this.props.instrClasses.concat([])
      : this.props.studentClasses.concat([]);
    const classes = [];
    classesIn.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name === b.name) return 0;
      return 1;
    });
    classesIn.forEach((element) => {
      classes.push(
        <ClassBox
          key={element.cid}
          img={this.getThumbnailSrc(element.thumbnail)}
          name={element.name}
          instructorString={getInstructorString(element.instructors, element.userData, this.props.username)}
          showLeaveButton={!this.props.onInstrView}
          deleteFunc={() => {
            this.setConfirmLeaveModalOpen(true, element.name, element.cid);
          }}
          redirFunc={() => {
            this.setClass(element.cid);
          }}
        />,
      );
    });

    const renderJoinOrCreate = this.props.onInstrView
      ? this.renderCreateAClass()
      : this.renderJoinAClass();
    return (
      <div className="classes-grid">
        {renderJoinOrCreate}
        {classes}
      </div>
    );
  };

  renderConfirmLeaveModal = () => (
    <ConfirmLeaveModalContainer
      isOpen={this.state.confirmLeaveModalOpen}
      onClose={() => this.setConfirmLeaveModalOpen(false)}
      className={this.state.selectedClass}
      cid={this.state.selectedCid}
      inClass={false}
    />
  );

  renderCreateClassModal = () => (
    <CreateClassModalContainer
      isOpen={this.state.createClassModalOpen}
      onClose={() => this.setCreateClassModalOpen(false)}
    />
  );

  renderJoinClassModal = () => (
    <JoinClassModalContainer
      isOpen={this.state.joinClassModalOpen}
      onClose={() => this.setJoinClassModalOpen(false)}
    />
  );

  renderContent = () => (
      <React.Fragment>
        {this.renderHeader()}
        {this.renderClassList()}
        {this.renderCreateClassModal()}
        {this.renderJoinClassModal()}
        {this.renderConfirmLeaveModal()}
      </React.Fragment>
    );

  render() {
    if (!this.state.loaded) {
      return <LoadingPage />;
    }

    const containerStyle = {
      width: this.props.calculatedWidth,
      height: this.props.screenHeight,
    };

    return (
      <div className="classes-container" style={containerStyle}>
        {this.renderContent()}
      </div>
    );
  }
}

export default Classes;
