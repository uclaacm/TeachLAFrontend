import React from "react";

/**-------Props--------
 * runCode: function to be called when button is pressed
 */
const EditorButton = props => (
  <div className="editor-run" onClick={props.handleClick}>
    <button
      title={props.title || ""}
      className="editor-run-button"
      style={{ backgroundColor: props.color, width: props.width }}
    >
      <span style={{ flex: "0 0 auto" }}>{props.text}</span>
    </button>
  </div>
);

export default EditorButton;
