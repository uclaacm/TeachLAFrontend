import '../styles/Login.scss';

import {
  faCode, faHeart, faPaintBrush, faRedo, faRocket,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import React, { useState, useEffect } from 'react';
import LoginImg1 from '../img/login1.svg';
import LoginImg2 from '../img/login2.svg';
import LoginImg3 from '../img/login3.svg';
import LoginImg4 from '../img/login4.svg';
import LoginImg5 from '../img/login5.svg';

import CreateUserForm from './Login/CreateUserForm';
import LoginForm from './Login/LoginForm';

const loginArt = [LoginImg1, LoginImg2, LoginImg3, LoginImg4, LoginImg5];
const loginArtAlts = [
  'girl on tablet',
  'boy using VR headset',
  'girl controlling drone',
  'boy developing an app',
  'girl coding for robot',
];

const gradientColors = {
  0: ['#FFB5B5', '#FFF7F3'],
  1: ['#54C9FE', '#D8F6FF'],
  2: ['#ACF53F', '#DAFFA4'],
  3: ['#FFF065', '#FFF7F3'],
  4: ['#FF94DB', '#FFE4EE'],
};

const themeColors = {
  0: ['#FF5F54', 'white'],
  1: ['#36C5FC', 'white'],
  2: ['#ACF53F', 'white'],
  3: ['#FFF065', 'black'],
  4: ['#FF94DB', 'white'],
};
const randomIndex = () => Math.floor(Math.random() * Object.keys(themeColors).length);

const Login = ({ create, initialState }) => {
  const [index, setIndex] = useState(randomIndex());
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const gradientPrimary = gradientColors[index][0];
  const gradientSecondary = gradientColors[index][1];
  const themePrimary = themeColors[index][0];
  const themeSecondary = themeColors[index][1];
  const themeTertiary = themeColors[index][1];
  const getBackgroundSVG = () => (
    <svg
      className="background-svg"
      viewBox={`0 0 1084 ${windowHeight}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={`
            M204.407 691.847
            C51.4294 796.853 0.666362 951.817 0 ${windowHeight}
            H1094
            V-14
            L53.4756 -6.443
            C178.418 14.2132 602.225 418.778 204.407 691.847Z
            `}
        fill="url(#paint0_linear)"
      />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="547"
          y1="0"
          x2="547"
          y2={`${windowHeight}`}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={gradientPrimary} />
          <stop offset="1" stopColor={gradientSecondary} stopOpacity="0.47" />
        </linearGradient>
      </defs>
    </svg>
  );

  const [svg, setSvg] = useState(getBackgroundSVG());
  const updateSvg = () => {
    setSvg(getBackgroundSVG());
  };
  // basically, when the window resizes, recalculates getBackgroundSVG - the window parameters change!
  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowHeight(window.innerHeight);
      updateSvg();
    });
    return () => window.removeEventListener('resize', () => setWindowHeight(window.innerHeight));
  }, [windowHeight]);

  useEffect(() => {
    updateSvg();
  }, [index]);

  const textHighlightStyle = {
    background: `linear-gradient(180deg, rgba(255,255,255,0) 80%, ${gradientPrimary} 50%)`,
  };
  return (
    <div className="login-page-content">
      <div className="login-page-content-container">
        <div
          className="bottom-right-toggle"
          onClick={() => setIndex(randomIndex())}
          onKeyDown={(e) => {
            if (e.key !== 'Tab') setIndex(randomIndex());
          }}
          role="button"
          tabIndex={0}
        >
          <FontAwesomeIcon icon={faRedo} />
        </div>
        <div className="login-page-content-main">
          <div>
            <h1 className="font-weight-bold">
              The ACM
              {' '}
              <span className="teachla-green">Teach LA</span>
              {' '}
              <span style={textHighlightStyle}>Online Editor</span>
            </h1>
            <p>a web IDE that lets you write and run Python &amp; Processing code, anywhere.</p>
            {create ? (
              <CreateUserForm
                initialState={initialState}
                themeColor={themePrimary}
                textColor={themeTertiary}
              />
            ) : (
              <LoginForm themeColor={themePrimary} textColor={themeSecondary} />
            )}
          </div>
        </div>
        <div className="login-page-content-footer">
          <FontAwesomeIcon icon={faPaintBrush} />
          {' '}
          <FontAwesomeIcon icon={faCode} />
          {' '}
          <FontAwesomeIcon icon={faRocket} />
          {' '}
          by
          {' '}
          <a href="https://teachla.uclaacm.com" target="_blank" rel="noopener noreferrer">
            <span className="teachla-green">ACM Teach LA</span>
          </a>
          {' '}
          with
          {' '}
          <FontAwesomeIcon className="beating-heart" icon={faHeart} />
        </div>
      </div>
      <div className="login-page-images">
        <img
          className="login-page-art"
          src={loginArt[index]}
          alt={`decorative login page art: ${loginArtAlts[index]}`}
        />
        {svg}
      </div>
    </div>
  );
};

export default Login;
