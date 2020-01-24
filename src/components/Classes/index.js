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

  renderHeader = () => (
    <div className="classes-header">
      <OpenPanelButtonContainer />
      <div className="classes-header-text">Classes</div>
      <Button
        className="ml-auto mr-2"
        color="success"
        size="lg"
        onClick={() => this.setJoinClassModalOpen(true)}
      >
        <FontAwesomeIcon icon={faKey} /> Instructor View
      </Button>
    </div>
  );

  updateClassCode = classCode => {
    this.setState({ classCode });
    console.log(this.state.classCode);
  };

  renderJoinAClass = () => {
    return (
      <Button className="class-box join-class" onClick={() => this.setJoinClassModalOpen(true)}>
        <FontAwesomeIcon className="fa-lg" icon={faPlus} />
        <span class="fa-lg">Join a class</span>
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
    let newList = this.props.classes.concat([]);
    if (newList.size === 0) {
      return (
        <div>
          <div className="no-classes-container">
            <h2>You're not enrolled in any classes!</h2>
          </div>
        </div>
      );
    }
    let classes = [];
    newList.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name === b.name) return 0;
      else return 1;
    });
    newList.forEach(({ key, name, thumbnail }) => {
      classes.push(
        <ClassBox
          img={this.getThumbnailSrc(thumbnail)}
          name={name}
          key={key}
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
