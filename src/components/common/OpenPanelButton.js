import React from "react";

/**-------Props--------
 * panelVisible: boolean, is profile panel visible
 * handleOnVisibleChange: function to call when you want the Profile Panel to disappear/reappear
 */

const OpenPanelButton = props => {
  const { panelVisible, handleOnVisibleChange } = props;

  //if the left panel is closed, show an empty div
  if (panelVisible) {
    return <div className="editor-expand-panel-arrow" />;
  }

  // otherwise show a > that when clicked, opens the panel
  return (
    <div
      className="editor-expand-panel-arrow"
      title="Open Profile Panel"
      onClick={handleOnVisibleChange}
    >
      >
    </div>
  );
};

export default OpenPanelButton;
