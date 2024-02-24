import '../../styles/SketchBox.scss';
import { faDownload, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';

interface SketchBoxProps {
  img: string;
  icon: any;
  name: string;
  deleteFunc: () => void;
  downloadFunc: () => void;
  editFunc: () => void;
  redirFunc: () => void;
  pathname: string;
}

function SketchBox({
  img, icon, name, deleteFunc, downloadFunc, editFunc, redirFunc, pathname,
}: SketchBoxProps) {
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
          src={`/img/sketch-thumbnails/${img}.svg`}
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
          .map((button) => (
            <Col className="p-2 text-center" onClick={button.func} key={button.icon.iconName}>
              <FontAwesomeIcon className="fa-lg" icon={button.icon} />
            </Col>
          ))
          // put a thin divider between each button
          .flatMap((e, i) => [e, <div className="sketch-button-divider" key={i} />])
          .slice(0, -1)}
      </Row>
    </div>
  );
}

export default SketchBox;
