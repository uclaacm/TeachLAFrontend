import React from "react";
import ClassBox from "./components/ClassBox";
import ConfirmLeaveModalContainer from "./containers/ConfirmLeaveModalContainer";
import CreateClassModalContainer from "./containers/CreateClassModalContainer";
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
      createClassModalOpen: false,
      joinClassModalOpen: false,
      selectedClass: "",
      selectedImg: "",
      selectedKey: "",
      classCode: "",
      instructorView: false,
    };
  }

  setCreateClassModalOpen = val => {
    this.setState({ createClassModalOpen: val });
  };

  setJoinClassModalOpen = val => {
    this.setState({ joinClassModalOpen: val });
  };

  setConfirmLeaveModalOpen = (val, className, key) => {
    this.setState({ confirmLeaveModalOpen: val, selectedClass: className, selectedKey: key });
  };

  switchInstrStudView = () => {
    this.setState({ instructorView: !this.state.instructorView });
  };

  renderHeader = () => {
    let buttonText, icon;
    if (this.state.instructorView) {
      buttonText = "To Student View";
      icon = faPencilAlt;
    } else {
      buttonText = "To Instructor View";
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

  renderCreateAClass = () => {
    return (
      <Button className="class-box join-class" onClick={() => this.setCreateClassModalOpen(true)}>
        <div className="join-class-plus">
          <FontAwesomeIcon className="fa-lg" icon={faPlus} />
        </div>
        <span className="fa-lg join-class-text">
          <b>Create a new class</b>
        </span>
      </Button>
    );
  };

  renderJoinAClass = () => {
    return (
      <Button className="class-box join-class" onClick={() => this.setJoinClassModalOpen(true)}>
        <div className="join-class-plus">
          <FontAwesomeIcon className="fa-lg" icon={faPlus} />
        </div>
        <span className="fa-lg join-class-text">
          <b>Join a class</b>
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

    let renderJoinOrCreate = this.state.instructorView
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
      classKey={this.state.selectedKey}
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

  renderContent = () => {
    return (
      <React.Fragment>
        {this.renderHeader()}
        {this.renderClassList()}
        {this.renderCreateClassModal()}
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
