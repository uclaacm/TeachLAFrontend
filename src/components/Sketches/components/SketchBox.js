import React from "react";

import "../../../styles/Sketches.css";

import { Row, Col } from "reactstrap";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class SketchBox extends React.Component {
  render() {
    return (
      <div className="sketch-box">
        <div className="sketch-box-body" onClick={this.props.redirFunc}>
          <img
            alt={"User's sketch icon"}
            src={`img/sketch-thumbnails/${this.props.img}.svg`}
            className="sketch-thumbnail"
          />
          <Row>
            <Col className="text-left">
              <span>{this.props.name}</span>
            </Col>
            <Col className="text-right">
              <FontAwesomeIcon icon={this.props.icon} />
            </Col>
          </Row>
        </div>
        <hr />
        <Row className="sketch-box-body">
          <Col className="text-left text-success">
            <FontAwesomeIcon icon={faEdit} />
          </Col>
          <Col className="text-right text-danger">
            <FontAwesomeIcon icon={faTrashAlt} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default SketchBox;
