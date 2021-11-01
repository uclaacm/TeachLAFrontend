import React from 'react';
import '../../../styles/ClassPage.scss';

const ClassInfoBox = ({
  title,
  children
}) => (
  <div className="class-info-box">
    <b className="section-header">{title}</b>
    <div>{children}</div>
  </div>
);

export default ClassInfoBox;
