import React from "react";
import "../../../styles/ClassPage.scss";

class ClassInfoBox extends React.Component {
  render() {
    return (
      <div className="class-info-box">
        <b className="section-header">{this.props.title}</b>
        <div>{this.props.content}</div>
      </div>
    );
  }
}

export default ClassInfoBox;
