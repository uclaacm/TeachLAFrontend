import React from "react";
import JoinClass from "./components/JoinClass";
import ClassBox from "./components/ClassBox";
import ConfirmLeaveModalContainer from "./containers/ConfirmLeaveModalContainer";
import CreateClassModalContainer from "./containers/CreateClassModalContainer";
import OpenPanelButtonContainer from "../common/containers/OpenPanelButtonContainer";
import { SketchThumbnailArray } from "./constants";
import "../../styles/Classes.scss";
import "../../styles/Sketches.scss";
import "../../styles/Login.scss";

import { Button } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const ROW_PADDING = 100;
const SKETCH_WIDTH = 220;

class Classes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectTo: "",
      confirmLeaveModalOpen: false,
      createClassModalOpen: false,
      selectedClass: "",
      selectedImg: "",
      selectedKey: "",
      classCode: "",
    };
  }

  getRandomSketchThumbnail = () => {
    return SketchThumbnailArray[Math.floor(Math.random() * SketchThumbnailArray.length)];
  };

  setCreateClassModalOpen = val => {
    this.setState({ createClassModalOpen: val });
  };

  setConfirmLeaveModalOpen = (val, sketch, key) => {
    this.setState({ confirmLeaveModalOpen: val, selectedSketch: sketch, selectedKey: key });
  };

  renderHeader = () => (
    <div className="sketches-header">
      <OpenPanelButtonContainer />
      <div className="sketches-header-text">Classes</div>
      <Button
        className="ml-auto mr-2"
        color="success"
        size="lg"
        onClick={() => this.setCreateClassModalOpen(true)}
      >
        <FontAwesomeIcon icon={faPlus} /> Create Class
      </Button>
    </div>
  );

  updateClassCode = classCode => {
    this.setState({ classCode });
    console.log(this.state.classCode);
  };

  renderJoinAClass = () => {
    let code = this.state.classCode;
    var uppercase = 0;
    for (var i = 0; i < code.length; i++)
      if (code.charAt(i) === code.charAt(i).toUpperCase()) {
        uppercase += 1;
      }
    let waiting = uppercase < 3;

    return (
      <JoinClass data={this.state.classCode} onChange={this.updateClassCode} waiting={waiting} />
    );
  };

  getThumbnailSrc = val => {
    if (val === undefined || val === "" || val >= SketchThumbnailArray.length || val < 0) {
      return SketchThumbnailArray[0];
    }
    return SketchThumbnailArray[val];
  };

  renderClasses = () => {
    let newList = this.props.classes.concat([]);
    if (newList.size === 0) {
      return (
        <div>
          <div className="no-sketches-container">
            <h2>You're not enrolled in any classes!</h2>
            <br />
            <p>
              <Button color="success" size="lg" onClick={() => this.setCreateClassModalOpen(true)}>
                Create A Class
              </Button>
            </p>
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
            this.redirectToEditor(key);
          }}
        />,
      );
    });
    let numClassesPerRow = Math.floor((this.props.calculatedWidth - ROW_PADDING) / SKETCH_WIDTH);
    let rows = [];
    let originalLength = classes.length;
    for (let i = 0; i < originalLength / numClassesPerRow; i++) {
      rows.push(
        <div className="sketches-grid-row" key={i}>
          {classes.splice(0, numClassesPerRow)}
        </div>,
      );
    }

    return <div className="sketches-grid">{rows}</div>;
  };

  renderConfirmLeaveModal = () => (
    <ConfirmLeaveModalContainer
      isOpen={this.state.confirmLeaveModalOpen}
      onClose={() => this.setConfirmLeaveModalOpen(false)}
      sketchName={this.state.selectedSketch}
      sketchKey={this.state.selectedKey}
    />
  );

  renderCreateClassModal = () => (
    <CreateClassModalContainer
      isOpen={this.state.createClassModalOpen}
      onClose={() => this.setCreateClassModalOpen(false)}
    />
  );

  renderContent = () => {
    return (
      <React.Fragment>
        {this.renderHeader()}
        <div className="classes-content-container">
          {this.renderJoinAClass()}
          {this.renderClasses()}
        </div>
        {this.renderCreateClassModal()}
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
      <div className="sketches-container" style={containerStyle}>
        {this.renderContent()}
      </div>
    );
  }
}

export default Classes;
