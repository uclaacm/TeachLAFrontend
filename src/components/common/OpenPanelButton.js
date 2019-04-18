import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**-------Props--------
 * panelOpen: boolean, is profile panel visible
 * togglePanel: function to call when you want the Profile Panel to disappear/reappear
 */

const OpenPanelButton = ({ panelOpen, togglePanel }) => {
  //if the left panel is closed, show nothing
  //otherwise show hamburger icon
  return (
    <div className="editor-expand-panel-arrow" title="Open Profile Panel" onClick={togglePanel}>
      {panelOpen ? "" : <FontAwesomeIcon icon="bars" />}
    </div>
  );
};

export default OpenPanelButton;
