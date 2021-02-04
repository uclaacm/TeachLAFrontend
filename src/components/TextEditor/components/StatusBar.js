import React from "react";

const StatusBar = (props) => {
  return (
    <div className="status-bar-container">
      <p className="status-bar-info">
        {props.editing ? "Editing" : "Viewing"} line: {props.line + 1} col: {props.col + 1}{" "}
      </p>
    </div>
  );
};
export default StatusBar;
