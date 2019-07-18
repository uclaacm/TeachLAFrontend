import React from "react";
import TLALogo from "../../img/tla-logo.svg";

export default props => (
  <div className="login-footer">
    <a href="https://github.com/uclaacm/TeachLAFrontend" target="_blank" rel="noopener noreferrer">
      <img
        className="login-footer-image"
        src={TLALogo}
        alt="Teach LA logo and link to GitHub Repository"
      />
    </a>
  </div>
);
