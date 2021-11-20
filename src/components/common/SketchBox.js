import '../../styles/SketchBox.scss';
import { faDownload, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';

class SketchBox extends React.Component {
  render() {
    const buttonData = [
      {
        func: this.props.editFunc,
        icon: faEdit,
      },
      {
        func: this.props.downloadFunc,
        icon: faDownload,
      },
      {
        func: this.props.deleteFunc,
        icon: faTrashAlt,
      },
    ];
    return (
      <div className="sketch-box">
        <Link
          className="sketch-box-body"
          onClick={this.props.redirFunc}
          to={{ pathname: this.props.pathname || '/editor' }}
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
          {
            buttonData.filter((data) => data.func)
              .map((data, idx) => (
                <Col className="p-2 text-center" onClick={data.func} key={idx}>
                  <FontAwesomeIcon className="fa-lg" icon={data.icon} />
                </Col>
              ))
              .reduce((acc, curr) => (acc.length > 0 ? [...acc, (<div className="sketch-button-divider" />), curr] : [curr]), [])
          }
        </Row>
      </div>
    );
  }
}

export default SketchBox;
