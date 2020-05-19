import React from "react";
import AddSketchModalContainer from "./containers/AddSketchModalContainer";
import SketchBox from "./components/SketchBox";
import StudentListEntry from "./components/StudentListEntry";
import CodeDownloader from "../../util/languages/CodeDownloader";
import OpenPanelButtonContainer from "../common/containers/OpenPanelButtonContainer";
import { ThumbnailArray } from "../Classes/constants";
import "../../styles/Classes.scss";
import "../../styles/ClassBox.scss"; // used for add sketch button right now

import { Button } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faCogs } from "@fortawesome/free-solid-svg-icons";
import { faPython } from "@fortawesome/free-brands-svg-icons";
import { faHtml5 } from "@fortawesome/free-brands-svg-icons";

class ClassPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addSketchModalOpen: false,
    };
  }

  setAddSketchModalOpen = (val) => {
    this.setState({ addSketchModalOpen: val });
  };

  renderHeader = () => {
    return (
      <div className="classes-header">
        <OpenPanelButtonContainer />
        <div className="classes-header-text">{this.props.name}</div>
      </div>
    );
  };

  getThumbnailSrc = (val) => {
    if (val === undefined || val === "" || val >= ThumbnailArray.length || val < 0) {
      return ThumbnailArray[0];
    }
    return ThumbnailArray[val];
  };

  renderClassInfo = () => {
    let instrString = "";
    if (this.props.instructors.length === 1)
      instrString = "Taught by ".concat(this.props.instructors[0]);

    return (
      <div>
        <b>{instrString}</b>
      </div>
    );
  };

  renderAddSketchButton = () => {
    return (
      <Button className="class-box join-class" onClick={() => this.setAddSketchModalOpen(true)}>
        <div className="join-class-plus">
          <FontAwesomeIcon className="fa-lg" icon={faPlus} />
        </div>
      </Button>
    );
  };

  renderSketchList = () => {
    let sketches = this.props.sketches.concat([]);
    sketches.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name === b.name) return 0;
      else return 1;
    });
    let sketchList = [];
    sketches.forEach(({ key, name, language, thumbnail, code }) => {
      let faLanguage;
      let languageDisplay;
      switch (language) {
        case "python":
          faLanguage = faPython;
          languageDisplay = "Python";
          break;
        case "processing":
          faLanguage = faCogs;
          languageDisplay = "Processing";
          break;
        case "html":
        default:
          faLanguage = faHtml5;
          languageDisplay = "HTML";
      }
      sketchList.push(
        <SketchBox
          img={this.getThumbnailSrc(thumbnail)}
          icon={faLanguage}
          name={name}
          key={key}
          // deleteFunc={() => {
          //   this.setConfirmDeleteModalOpen(true, name, key);
          // }}
          downloadFunc={() => {
            CodeDownloader.download(name, language, code);
          }}
          // editFunc={() => {
          //   this.setEditSketchModalOpen(
          //     true,
          //     name,
          //     this.getThumbnailSrc(thumbnail),
          //     languageDisplay,
          //     key,
          //   );
          // }}
          // redirFunc={() => {
          //   this.setProgram(key);
          // }}
        />,
      );
    });
    if (this.props.isInstr) {
      sketchList.push(this.renderAddSketchButton());
    }
    return <div className="classes-grid">{sketchList}</div>;
  };

  renderAddSketchModal = () => (
    <AddSketchModalContainer
      isOpen={this.state.addSketchModalOpen}
      onClose={() => this.setAddSketchModalOpen(false)}
    />
  );

  renderStudentList = () => {
    let students = this.props.students.concat([]);
    students.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name === b.name) return 0;
      else return 1;
    });
    let studentList = [];
    students.forEach(({ key, name }) => {
      studentList.push(<StudentListEntry name={name} key={key} />);
    });

    return <div className="classes-grid">{studentList}</div>;
  };

  renderContent = () => {
    return (
      <React.Fragment>
        {this.renderHeader()}
        {this.renderClassInfo()}
        {this.renderSketchList()}
        {this.renderAddSketchModal()}
        {this.renderStudentList()}
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

export default ClassPage;
