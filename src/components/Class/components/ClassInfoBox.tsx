import React from 'react';
import '../../../styles/ClassPage.scss';

interface ClassInfoBoxProps {
  title: string;
  children: React.ReactNode;
};

const ClassInfoBox = function ({
  title,
  children,
} : ClassInfoBoxProps) {
  return (
    <div className="class-info-box">
      <b className="section-header">{title}</b>
      <div>{children}</div>
    </div>
  );
};

export default ClassInfoBox;
