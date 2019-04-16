import React from "react";
import "../../../styles/Editor.css";

/**-------Props--------
 * runCode: function to be called when button is pressed
 */
const SketchesButton = props => (
  <div className="editor-run" onClick={props.handleClick}>
    <button className="editor-run-button" style={{ backgroundColor: props.color }}>
      <span style={{ flex: "0 0 auto" }}>{props.text}</span>
    </button>
  </div>
);

export default SketchesButton;
