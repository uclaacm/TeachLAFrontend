import React, { useState } from "react";

const StatusBar = (props) => {
  const edit = props.editing;
  return (
    <div className="status-bar-container">
      <p
        className="status-bar-info"
        className={props.theme === "light" ? "light-status" : "dark-status"}
      >
        {edit ? "Editing" : "Viewing"} line: {props.line + 1} col: {props.col + 1}{" "}
      </p>
    </div>
  );
};
export default StatusBar;
