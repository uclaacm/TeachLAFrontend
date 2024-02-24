import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import '../../../styles/ClassBox.scss';

interface ClassBoxProps {
  deleteFunc: () => void;
  img: string;
  instructorString: string;
  name: string;
  redirFunc: () => void;
  showLeaveButton: JSX.Element;
}

const ClassBox = function ({
  deleteFunc, img, instructorString, name, redirFunc, showLeaveButton,
}: ClassBoxProps) {
  const leaveButton = showLeaveButton ? (
    <div
      className="p-2 text-center"
      onClick={deleteFunc}
      onKeyDown={deleteFunc}
      role="button"
      tabIndex={0}
    >
      <FontAwesomeIcon className="fa-lg" icon={faTrashAlt} />
    </div>
  ) : (
    ''
  );

  return (
    <div className="class-box">
      <Link className="class-box-body" onClick={redirFunc} to={{ pathname: '/class' }}>
        <img
          alt="Class icon"
          src={`/img/sketch-thumbnails/${img}.svg`}
          className="class-thumbnail"
        />
        <div className="class-info">
          <b className="fa-lg">{name}</b>
          <div className="fa-lg instructor-name">{instructorString}</div>
        </div>
      </Link>
      {leaveButton}
    </div>
  );
};

export default ClassBox;
