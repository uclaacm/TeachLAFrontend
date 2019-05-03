import React from "react";

import "../../../styles/Sketches.css";

import { Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class SketchBox extends React.Component {
  render() {
    return (
      <div className="sketch-box">
        <div onClick={this.props.redirFunc}>
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
      </div>
    );
  }
}

export default SketchBox;
