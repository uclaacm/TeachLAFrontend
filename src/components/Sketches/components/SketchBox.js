import React from "react";

import "../../../styles/Sketches.css";

import { Row, Col } from "reactstrap";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
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
            src={`${process.env.PUBLIC_URL}/img/sketch-thumbnails/${this.props.img}.svg`}
            className="sketch-thumbnail mt-2"
          />
          <Row className="my-2">
            <Col className="text-left" xs="9">
              <b className="fa-lg">{this.props.name}</b>
            </Col>
            <Col className="text-right" xs="3">
              <FontAwesomeIcon className="fa-lg" icon={this.props.icon} />
            </Col>
          </Row>
        </div>
        <hr className="sketch-divider" />
        <Row className="sketch-box-body">
          <Col className="p-2 text-center" onClick={this.props.editFunc}>
            <FontAwesomeIcon className="fa-lg" icon={faEdit} />
          </Col>
          <div className="sketch-button-divider" />
          <Col className="p-2 text-center" onClick={this.props.downloadFunc}>
            <FontAwesomeIcon className="fa-lg" icon={faDownload} />
          </Col>
          <div className="sketch-button-divider" />
          <Col className="p-2 text-center" onClick={this.props.deleteFunc}>
            <FontAwesomeIcon className="fa-lg" icon={faTrashAlt} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default SketchBox;
