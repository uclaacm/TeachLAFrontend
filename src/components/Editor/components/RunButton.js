import React from "react";

/**-------Props--------
 * runCode: function to be called when button is pressed
 */
const RunButton = props => (
  <div className="editor-run" onClick={props.runCode}>
    <button className="editor-run-button">
      <div className="editor-run-button-content">
        <span className="editor-run-button-arrow">></span>
        <span className="editor-run-button-text">Run Code</span>
      </div>
    </button>
  </div>
);

export default RunButton;
