import React from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ThumbnailArray } from '../../../constants';
import SketchBox from '../../common/SketchBox';
import CodeDownloader from '../../../util/languages/CodeDownloader';

import '../../../styles/SketchBox.scss';

const SKETCHES_ROW_PADDING = 100;
const SKETCH_WIDTH = 220;

const ClassSketchList = ({
  calculatedWidth, 
  isInstr,
  programData,
  setCreateSketchModalOpen,
}) => {
  let newList = programData?.concat([]) || [];
  newList.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name === b.name) return 0;
    else return 1;
  });

  const getThumbnailSrc = (val) => {
    if (val === undefined || val === '' || val >= ThumbnailArray.length || val < 0) {
      return ThumbnailArray[0];
    }
    return ThumbnailArray[val];
  };

  const sketchList = newList.map(({ uid, name, language, thumbnail, code }) => {
    return (
      <SketchBox
        key={uid}
        img={getThumbnailSrc(thumbnail)}
        icon={language.icon}
        name={name}
        downloadFunc={() => {
          CodeDownloader.download(name, language, code);
        }}
        pathname={isInstr ? '/editor' : `/p/${uid}`}
      />
    )
  });

  // Button for instructors to add a sketch to the class.
  if (isInstr) {
    sketchList.push(
      <div
        key="add-sketch"
        className="add-sketch-box sketch-box"
        onClick={() => setCreateSketchModalOpen(true)}
      >
        <div className="add-sketch-box-body sketch-box-body">
          <FontAwesomeIcon className="fa-2x add-sketch-plus" icon={faPlus} />
        </div>
        <div className="fa-lg">
          <b>Add a sketch</b>
        </div>
      </div>,
    );
  }

  // TODO: This should be a flexbox, instead of this
  let numSketchesPerRow = Math.floor((calculatedWidth - SKETCHES_ROW_PADDING) / SKETCH_WIDTH);
  let rows = [];
  let originalLength = sketchList.length;
  for (let i = 0; i < originalLength / numSketchesPerRow; i++) {
    rows.push(
      <div className="class-sketches-grid-row" key={i}>
        {sketchList.splice(0, numSketchesPerRow)}
      </div>,
    );
  }
  if (rows.length === 0) return 'No sketches found';
  return <div className="class-sketches-grid">{rows}</div>;
};

export default ClassSketchList;
