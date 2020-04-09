import React from "react";
import "styles/ClassBox.scss";

class StudentListEntry extends React.Component {
  render() {
    return (
      <div className="class-box class-box-body">
        <div className="class-info">
          <b className="fa-lg">{this.props.name}</b>
          <div className="fa-lg">{this.props.name}</div>
        </div>
      </div>
    );
  }
}

export default StudentListEntry;
