import React from "react";
import * as fetch from "../../lib/fetch.js";
import ClassInfoBox from "./components/ClassInfoBox";
import OpenPanelButtonContainer from "../common/containers/OpenPanelButtonContainer";
import "../../styles/Classes.scss";
import "../../styles/ClassPage.scss";
import LoadingPage from "../common/LoadingPage";
// For sketches list
import { faCogs } from "@fortawesome/free-solid-svg-icons";
import { faPython } from "@fortawesome/free-brands-svg-icons";
import { faHtml5 } from "@fortawesome/free-brands-svg-icons";
import SketchBox from "./components/SketchBox";
import { ThumbnailArray } from "../Classes/constants";
import CodeDownloader from "../../util/languages/CodeDownloader";

const SKETCHES_ROW_PADDING = 100;
const SKETCH_WIDTH = 220;

// Test values
let sketches = [];
sketches.push({
  key: "1",
  name: "Will's Python Sketch",
  language: "python",
  thumbnail: 14,
  code: "blah blah blah",
});
sketches.push({
  key: "2",
  name: "Some HTML",
  language: "html",
  thumbnail: 2,
  code: "<div>blah</div>",
});

let students = [];
students.push({
  key: "1",
  name: "Bob",
});
students.push({
  key: "2",
  name: "Jim",
});
students.push({
  key: "3",
  name: "Clark",
});
// END test values

class ClassPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      error: "",
      // REPLACE TEST VALUES
      thumbnail: 1,
      name: "Will's Class",
      instructors: ["Will O."],
      sketches: sketches,
      isInstr: true,
      students: students,
      wid: "Big Chunky Monkey",
      // Uncomment when description is implemented
      // description: "",
    };
  }

  componentDidMount = async () => {
    let data = {
      uid: this.props.uid,
      cid: this.props.cid,
    };

    try {
      fetch
        .getClass(data)
        .then((res) => {
          if (!res.ok) throw new Error(`Error loading this class! Got status ${res.status}`);
          return res.json();
        })
        .then((json) => {
          this.setState({
            // Review these when back-end API is updated
            loaded: true,
            thumbnail: json.thumbnail,
            name: json.name,
            instructors: json.instructors,
            isInstr: this.props.uid in json.instructors,
            sketches: json.programs,
            students: json.members,
            wid: json.members,
          });
        })
        .catch((err) => {
          this.setState({
            error: "Failed to load the class. Please try again later.",
          });
        });
    } catch (err) {
      console.log(err);
    }
  };

  renderHeader = () => {
    return (
      <div className="classes-header">
        <OpenPanelButtonContainer />
        <div className="classes-header-text">{this.state.name}</div>
      </div>
    );
  };

  renderClassInfo = () => {
    let instString = "";
    switch (this.state.instructors.length) {
      case 0:
        break;
      case 1:
        instString = this.state.instructors[0];
        break;
      case 2:
        instString = this.state.instructors.join(" and ");
        break;
      default:
        for (let i = 0; i < this.state.instructors.length - 1; i++) {
          instString += this.state.instructors[i];
          instString += ", ";
        }
        instString += "and ";
        instString += this.state.instructors[this.state.instructors.length - 1];
    }
    return (
      <>
        <ClassInfoBox title={"Instructors"} content={instString} />
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
    return (
      <ClassInfoBox
        title={"Students"}
        content={this.state.students.map((student) => student.name).join(", ")}
      />
    );
  };

  // Start of sketches list stuff -- it should probably be moved out of here
  getThumbnailSrc = (val) => {
    if (val === undefined || val === "" || val >= ThumbnailArray.length || val < 0) {
      return ThumbnailArray[0];
    }
    return ThumbnailArray[val];
  };

  renderSketchList = () => {
    let newList = this.state.sketches.concat([]);
    newList.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name === b.name) return 0;
      else return 1;
    });
    let sketchList = [];
    newList.forEach(({ key, name, language, thumbnail, code }) => {
      let faLanguage;
      switch (language) {
        case "python":
          faLanguage = faPython;
          break;
        case "processing":
          faLanguage = faCogs;
          break;
        case "html":
        default:
          faLanguage = faHtml5;
      }
      sketchList.push(
        <SketchBox
          img={this.getThumbnailSrc(thumbnail)}
          icon={faLanguage}
          name={name}
          key={key}
          downloadFunc={() => {
            CodeDownloader.download(name, language, code);
          }}
        />,
      );
    });
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
    return <ClassInfoBox title={"Sketches"} content={sketchesDisplay} />;
  };

  renderContent = () => {
    return (
      <div className="class-content-container">
        {this.renderClassInfo()}
        {this.renderStudentList()}
        {this.renderSketchList()}
      </div>
    );
  };

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
        {this.renderHeader()}
        {this.renderContent()}
      </div>
    );
  }
}

export default ClassPage;
