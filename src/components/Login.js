import React from "react";
import "styles/Login.scss";
import LoginForm from "./Login/LoginForm";
import CreateUserForm from "./Login/CreateUserForm.js";

import { faCode, faHeart, faPaintBrush, faRedo, faRocket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import LoginImg1 from "img/login1.svg";
import LoginImg2 from "img/login2.svg";
import LoginImg3 from "img/login3.svg";
import LoginImg4 from "img/login4.svg";
import LoginImg5 from "img/login5.svg";

const loginArt = [LoginImg1, LoginImg2, LoginImg3, LoginImg4, LoginImg5];
const loginArtAlts = [
  "girl on tablet",
  "boy using VR headset",
  "girl controlling drone",
  "boy developing an app",
  "girl coding for robot",
];

const gradientColors = {
  0: ["#FFB5B5", "#FFF7F3"],
  1: ["#54C9FE", "#D8F6FF"],
  2: ["#ACF53F", "#DAFFA4"],
  3: ["#FFF065", "#FFF7F3"],
  4: ["#FF94DB", "#FFE4EE"],
};

const themeColors = {
  0: ["#FF5F54", "white"],
  1: ["#36C5FC", "white"],
  2: ["#ACF53F", "white"],
  3: ["#FFF065", "black"],
  4: ["#FF94DB", "white"],
};

class Login extends React.Component {
  state = {
    dummy: false,
  };
  getSVG = (index) => {
    return (
      <svg
        className="background-svg"
        width="1084"
        height="1024"
        viewBox="0 0 1084 1024"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M204.407 691.847C51.4294 796.853 0.666362 951.817 0 1042H1094V-14L53.4756 -6.443C178.418 14.2132 602.225 418.778 204.407 691.847Z"
          fill="url(#paint0_linear)"
        />
        <defs>
          <linearGradient
            id="paint0_linear"
            x1="547"
            y1="-14"
            x2="547"
            y2="1042"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={gradientColors[index][0]} />
            <stop offset="1" stopColor={gradientColors[index][1]} stopOpacity="0.47" />
          </linearGradient>
        </defs>
      </svg>
    );
  };

  render = () => {
    const index = Math.floor(Math.random() * 5);
    const textHighlightStyle = {
      background: `linear-gradient(180deg, rgba(255,255,255,0) 80%, ${gradientColors[index][0]} 50%)`,
    };
    return (
      <div className="login-page-content">
        <div className="login-page-content-container">
          <div
            className="bottom-right-toggle"
            onClick={() => this.setState({ dummy: !this.state.dummy })}
          >
            <FontAwesomeIcon icon={faRedo} />
          </div>
          <div className="login-page-content-main">
            <div>
              <h1 className="font-weight-bold">
                The ACM <span className="teachla-green">Teach LA</span>{" "}
                <span style={textHighlightStyle}>Online Editor</span>
              </h1>
              <p>a web IDE that lets you write and run Python &amp; Processing code, anywhere.</p>
              {this.props.create ? (
                <CreateUserForm
                  initialState={this.props.initialState}
                  themeColor={themeColors[index][0]}
                  textColor={themeColors[index][2]}
                />
              ) : (
                <LoginForm themeColor={themeColors[index][0]} textColor={themeColors[index][1]} />
              )}
            </div>
          </div>
          <div className="login-page-content-footer">
            <FontAwesomeIcon icon={faPaintBrush} /> <FontAwesomeIcon icon={faCode} />{" "}
            <FontAwesomeIcon icon={faRocket} /> by{" "}
            <a href="https://teachla.uclaacm.com" target="_blank" rel="noopener noreferrer">
              <span className="teachla-green">ACM Teach LA</span>
            </a>{" "}
            with <FontAwesomeIcon className="beating-heart" icon={faHeart} />
          </div>
        </div>
        <div className="login-page-images">
          <img
            className="login-page-art"
            src={loginArt[index]}
            alt={`decorative login page art: ${loginArtAlts[index]}`}
          />
          {this.getSVG(index)}
        </div>
      </div>
    );
  };
}

export default Login;
