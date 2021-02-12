import React, { useState } from "react";

const StatusBar = (props) => {
  const edit = props.editing;
  const textStyle = { color: "white" };
  if (props.theme === "light") {
    textStyle.color = "black";
  }
  return (
    <div className="status-bar-container">
      <p className="status-bar-info" style={textStyle}>
        {edit ? "Editing" : "Viewing"} line: {props.line + 1} col: {props.col + 1}{" "}
      </p>
    </div>
  );
};
export default StatusBar;
