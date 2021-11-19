import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

/** -------Props--------
 * panelOpen: boolean, is profile panel visible
 * togglePanel: function to call when you want the Profile Panel to disappear/reappear
 */

const OpenPanelButton = function ({ panelOpen, togglePanel }) {
  // if the left panel is closed, show nothing
  // otherwise show hamburger icon
  if (panelOpen) {
    return <div className="editor-expand-panel-arrow-hidden" />;
  }
  return (
    <div className="editor-expand-panel-arrow" title="Open Profile Panel" onClick={togglePanel}>
      <FontAwesomeIcon icon={faBars} />
    </div>
  );
};

export default OpenPanelButton;
