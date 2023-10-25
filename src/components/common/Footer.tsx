import React from 'react';
import TLALogo from '../../img/tla-logo.svg';
import '../../styles/Footer.scss';

const Footer = function () {
  return (
    <footer className="footer">
      <a href="https://github.com/uclaacm/TeachLAFrontend" target="_blank" rel="noopener noreferrer">
        <img
          className="footer-image"
          src={TLALogo}
          alt="Teach LA logo and link to GitHub Repository"
        />
      </a>
    </footer>
  );
};

export default Footer;
