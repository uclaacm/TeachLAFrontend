import React from "react";
import "../../styles/SocialButton.css";

/*
	Props:
		bgColor: string representing the color of the background of the img (can be hex color, rgb(r, g, b, a), or color name)
		textColor: string representing the color of the text in the button (can be hex color, rgb(r, g, b, a), or color name)
		imgSrc: string representing the location of the img used as the icon (can be in the form of URL, path location, or data representing image)
		textPadding: string representing padding to the left of the text, i.e. distance from the img (give px units)
*/

const SocialButton = props => (
  <button
    className="login-button"
    style={{ backgroundColor: props.bgColor ? props.bgColor : props.textColor }}
    onClick={props.handleLogin}
  >
    {/*Style in React is different than css, you give it a JSON with camelcased keys of css like background-color is backgroundColor*/}
    <div style={{ position: "relative" }}>
      <span className="login-button-content">
        {props.imgSrc ? (
          <img className="login-button-img" alt="Login" src={props.imgSrc} />
        ) : (
          <span />
        )}
        <span
          className="login-button-text"
          style={{ left: props.textPadding ? props.textPadding : "0px" }}
        >
          {props.children ? props.children : props.value ? props.value : "Login"}
          {/*if there's children, render the children, otherwise if value is defined, render value, otherwise just render "Login"*/}
        </span>
      </span>
    </div>
  </button>
);

export default SocialButton;
