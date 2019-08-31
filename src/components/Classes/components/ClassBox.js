import React from "react";
import { Link } from "react-router-dom";
import "styles/ClassBox.scss";

import { Row, Col } from "reactstrap";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ClassBox extends React.Component {
  render() {
    return (
      <div className="class-box">
        <Link
          className="class-box-body"
          onClick={this.props.redirFunc}
          // PUT URL FOR CLASS HERE
          to={{ pathname: "/class-" }}
        >
          <img
            alt={"Class icon"}
            src={`${process.env.PUBLIC_URL}/img/sketch-thumbnails/${this.props.img}.svg`}
            className="class-thumbnail"
          />
          <div className="class-info">
            <b className="fa-lg">{this.props.name}</b>
            <div className="fa-lg instructor-name">{this.props.instructorString}</div>
          </div>
        </Link>
        <Col className="class-box-body">
          <Row className="p-2 text-center" onClick={this.props.deleteFunc}>
            <FontAwesomeIcon className="fa-lg" icon={faTrashAlt} />
          </Row>
        </Col>
      </div>
    );
  }
}

export default ClassBox;
