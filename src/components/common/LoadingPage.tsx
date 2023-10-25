import React, { useState, useEffect } from 'react';
import { RingLoader } from 'react-spinners';
import '../../styles/Loading.scss';
import { GH_REPO_NAME } from '../../constants';

interface LoadingProps {
  shouldShowHelpText: boolean;
}

const Loading = ({ shouldShowHelpText = false }: LoadingProps) => {
  const [showHelpText, setShowHelpText] = useState(shouldShowHelpText);

  const timer = setTimeout(
    () => {
      setShowHelpText(true);
    },
    2000,
  );

  useEffect(() => () => {
    clearTimeout(timer);
  }, []);

  return (
    <div className="Loading">
      <div className="Loading-title">Loading</div>
      <RingLoader color="#171124" size={250} loading />
      {showHelpText && (
        <p className="Loading-page-text" style={{ color: 'white' }}>
          Looks like loading is taking a bit long! If it takes too long, submit an issue on
          {' '}
          <span> </span>
          <a href={`${GH_REPO_NAME}/issues`} className="Loading-link-text">
            Github
          </a>
          .
        </p>
      )}
    </div>
  );
};

export default Loading;
