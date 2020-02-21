import React from "react";
// import JoinClass from "./components/JoinClass";
import ClassBox from "./components/ClassBox";
import ConfirmLeaveModalContainer from "./containers/ConfirmLeaveModalContainer";
import JoinClassModalContainer from "./containers/JoinClassModalContainer";
import OpenPanelButtonContainer from "../common/containers/OpenPanelButtonContainer";
import { SketchThumbnailArray } from "./constants";
import "../../styles/ClassBox.scss";
import "../../styles/Classes.scss";
import "../../styles/Login.scss";

import { Button } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

class Classes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectTo: "",
      confirmLeaveModalOpen: false,
      joinClassModalOpen: false,
      selectedClass: "",
      selectedImg: "",
      selectedKey: "",
      classCode: "",
      instructorView: false,
    };
  }

  getRandomSketchThumbnail = () => {
    return SketchThumbnailArray[Math.floor(Math.random() * SketchThumbnailArray.length)];
  };

  setJoinClassModalOpen = val => {
    this.setState({ joinClassModalOpen: val });
  };

  setConfirmLeaveModalOpen = (val, sketch, key) => {
    this.setState({ confirmLeaveModalOpen: val, selectedSketch: sketch, selectedKey: key });
  };

  switchInstrStudView = () => {
    this.setState({ instructorView: !this.state.instructorView });
  };

  renderHeader = () => {
    let buttonText, icon;
    if (this.state.instructorView) {
      buttonText = "Student View";
      icon = faPencilAlt;
    } else {
      buttonText = "Instructor View";
      icon = faKey;
    }

    return (
      <div className="classes-header">
        <OpenPanelButtonContainer />
        <div className="classes-header-text">Classes</div>
        <Button
          className="ml-auto mr-2"
          color="success"
          size="lg"
          onClick={() => this.switchInstrStudView()}
        >
          <FontAwesomeIcon icon={icon} /> {buttonText}
        </Button>
      </div>
    );
  };

  updateClassCode = classCode => {
    this.setState({ classCode });
    console.log(this.state.classCode);
  };

  renderJoinAClass = () => {
    let text = this.state.instructorView ? "Create a new class" : "Join a class";
    return (
      <Button className="class-box join-class" onClick={() => this.setJoinClassModalOpen(true)}>
        <div class="join-class-plus">
          <FontAwesomeIcon className="fa-lg" icon={faPlus} />
        </div>
        <span class="fa-lg join-class-text">
          <b>{text}</b>
        </span>
      </Button>
    );
  };

  getThumbnailSrc = val => {
    if (val === undefined || val === "" || val >= SketchThumbnailArray.length || val < 0) {
      return SketchThumbnailArray[0];
    }
    return SketchThumbnailArray[val];
  };

  renderClassList = () => {
    let classesIn = this.state.instructorView ? this.props.instrClasses : this.props.studClasses;
    classesIn = classesIn.concat([]);
    let classes = [];
    classesIn.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name === b.name) return 0;
      else return 1;
    });
    classesIn.forEach(({ key, name, thumbnail, instructor }) => {
      classes.push(
        <ClassBox
          img={this.getThumbnailSrc(thumbnail)}
          name={name}
          key={key}
          instructorString={"Instructor: ".concat(instructor)}
          deleteFunc={() => {
            this.setConfirmLeaveModalOpen(true, name, key);
          }}
          redirFunc={() => {
            this.redirectToClassPage(key);
          }}
        />,
      );
    });

    return (
      <div className="classes-grid">
        {this.renderJoinAClass()}
        {classes}
      </div>
    );
  };

  renderConfirmLeaveModal = () => (
    <ConfirmLeaveModalContainer
      isOpen={this.state.confirmLeaveModalOpen}
      onClose={() => this.setConfirmLeaveModalOpen(false)}
      sketchName={this.state.selectedSketch}
      sketchKey={this.state.selectedKey}
    />
  );

  renderJoinClassModal = () => (
    <JoinClassModalContainer
      isOpen={this.state.joinClassModalOpen}
      onClose={() => this.setJoinClassModalOpen(false)}
    />
  );

  renderContent = () => {
    return (
      <React.Fragment>
        {this.renderHeader()}
        {this.renderClassList()}
        {this.renderJoinClassModal()}
        {this.renderConfirmLeaveModal()}
      </React.Fragment>
    );
  };

  render() {
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
