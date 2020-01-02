import React from "react";
import { Link } from "react-router-dom";
import "styles/SketchBox.scss";

import { Row, Col } from "reactstrap";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ClassBox extends React.Component {
  render() {
    return (
      <div className="sketch-box">
        <Link
          className="sketch-box-body"
          onClick={this.props.redirFunc}
          // PUT URL FOR CLASS HERE
          to={{ pathname: "/class-" }}
        >
          <img
            alt={"Class icon"}
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
        </Link>
        <hr className="sketch-divider" />
        <Row className="sketch-box-body">
          <Col className="p-2 text-center" onClick={this.props.deleteFunc}>
            <FontAwesomeIcon className="fa-lg" icon={faTrashAlt} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default ClassBox;
