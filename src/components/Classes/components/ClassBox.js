import React from "react";
import { Link } from "react-router-dom";
import "styles/ClassBox.scss";

import { Row, Col } from "reactstrap";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ClassBox extends React.Component {
  // TODO: Change this to look up instructor name from uid
  instructorString = (instructors) => {
    if (instructors.length === 1) return "Instructor: ".concat(instructors[0]);
    else return "Instructors: ".concat(instructors.join(", "));
  };

  render() {
    let leaveButton = this.props.showLeaveButton ? (
      <Col className="class-box-body">
        <Row className="p-2 text-center" onClick={this.props.deleteFunc}>
          <FontAwesomeIcon className="fa-lg" icon={faTrashAlt} />
        </Row>
      </Col>
    ) : (
      ""
    );

    return (
      <div className="class-box">
        <Link className="class-box-body" onClick={this.props.redirFunc} to={{ pathname: "/class" }}>
          <img
            alt={"Class icon"}
            src={`${process.env.PUBLIC_URL}/img/sketch-thumbnails/${this.props.img}.svg`}
            className="class-thumbnail"
          />
          <div className="class-info">
            <b className="fa-lg">{this.props.name}</b>
            <div className="fa-lg instructor-name">
              {this.instructorString(this.props.instructors)}
            </div>
          </div>
        </Link>
        {leaveButton}
      </div>
    );
  }
}

export default ClassBox;
