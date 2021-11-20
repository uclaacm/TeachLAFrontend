import React from 'react';
import '../../../styles/ClassBox.scss';

const StudentListEntry = function (props) {
  const { name } = props;
  return (
    <div className="class-box class-box-body">
      <div className="class-info">
        <b className="fa-lg">{name}</b>
        <div className="fa-lg">{name}</div>
      </div>
    </div>
  );
};

export default StudentListEntry;
