import React from "react";

const RunButton = props => (
  <div className="editor-run" onClick={props.runCode}>
    <button className="editor-run-button">
      <div className="editor-run-button-content">
        <span style={{ flex: "1 1 auto", width: "100%" }}>></span>{" "}
        {/* > takes up as much space as possible while the Run Code is fixed size*/}
        <span style={{ flex: "0 0 auto" }}>Run Code</span>
      </div>
    </button>
  </div>
);

export default RunButton;
