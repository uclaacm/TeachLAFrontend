import '../../styles/SketchBox.scss';
import { faDownload, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';

const SketchBox = function ({
  img,
  icon,
  name,
  deleteFunc,
  downloadFunc,
  editFunc,
  redirFunc,
  pathname,
}) {
  const buttonData = [
    {
      func: editFunc,
      icon: faEdit,
    },
    {
      func: downloadFunc,
      icon: faDownload,
    },
    {
      func: deleteFunc,
      icon: faTrashAlt,
    },
  ];

  return (
    <div className="sketch-box">
      <Link
        className="sketch-box-body"
        onClick={redirFunc}
        to={{ pathname: pathname || '/editor' }}
      >
        <img
          alt={"User's sketch icon"}
          src={`${process.env.PUBLIC_URL}/img/sketch-thumbnails/${img}.svg`}
          className="sketch-thumbnail mt-2"
        />
        <div className="sketch-metadata">
          <b className="sketch-name">{name}</b>
          <FontAwesomeIcon className="sketch-icon" icon={icon} />
        </div>
      </Link>
      <hr className="sketch-divider" />
      <Row className="sketch-box-body">
        {buttonData
          .filter((data) => data.func)
          .map((data) => (
            <Col className="p-2 text-center" onClick={data.func} key={data.icon}>
              <FontAwesomeIcon className="fa-lg" icon={data.icon} />
            </Col>
          ))
          .reduce(
            (acc, curr) => (acc.length > 0 ? [...acc, <div className="sketch-button-divider" />, curr] : [curr]),
            [],
          )}
      </Row>
    </div>
  );
};

export default SketchBox;
