import React from "react";

/**-------Props--------
 * runCode: function to be called when button is pressed
 */
const RunButton = props => (
  <div className="editor-run" onClick={props.handleSave}>
    <button className="editor-run-button">
      <div className="editor-run-button-content">
        <span style={{ flex: "1 1 auto", width: "100%" }}>></span>{" "}
        {/* > takes up as much space as possible while the Run Code is fixed size*/}
        <span style={{ flex: "0 0 auto" }}>{props.text}</span>
      </div>
    </button>
  </div>
);

export default RunButton;