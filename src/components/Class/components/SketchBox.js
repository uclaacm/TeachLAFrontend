import React from "react";
import { Link } from "react-router-dom";
import "styles/SketchBox.scss";
import "styles/ClassPage.scss";

import { Row, Col } from "reactstrap";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/* This is a slightly different sketch box to use on the class page.
It would be great to parameterize and reuse the original sketch box. */

class SketchBox extends React.Component {
  render() {
    return (
      <div className="sketch-box">
        <Link
          className="sketch-box-body"
          onClick={this.props.redirFunc}
          to={{ pathname: "/editor" }}
        >
          <img
            alt={"User's sketch icon"}
            src={`${process.env.PUBLIC_URL}/img/sketch-thumbnails/${this.props.img}.svg`}
            className="sketch-thumbnail mt-2"
          />
          <div className="sketch-metadata">
            <b className="sketch-name">{this.props.name}</b>
            <FontAwesomeIcon className="sketch-icon" icon={this.props.icon} />
          </div>
        </Link>
        <hr className="sketch-divider" />
        <Row className="sketch-box-body">
          {/* <Col className="p-2 text-center" onClick={this.props.editFunc}>
            <FontAwesomeIcon className="fa-lg" icon={faEdit} />
          </Col> */}
          {/* <div className="sketch-button-divider" /> */}
          <Col className="p-2 text-center" onClick={this.props.downloadFunc}>
            <FontAwesomeIcon className="fa-lg" icon={faDownload} />
          </Col>
          {/* <div className="sketch-button-divider" /> */}
          {/* <Col className="p-2 text-center" onClick={this.props.deleteFunc}>
            <FontAwesomeIcon className="fa-lg" icon={faTrashAlt} />
          </Col> */}
        </Row>
      </div>
    );
  }
}

export default SketchBox;
