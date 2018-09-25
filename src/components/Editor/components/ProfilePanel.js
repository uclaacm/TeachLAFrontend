import React from "react";
import Dock from "react-dock";
import defaultPic from "../../../img/defaultProfile.png";
import firebase from "firebase";

/**--------Props--------
 * handleOnSizeChange: function to be called when the panel is resized
 * handleOnVisibleChange: function to be called when the panel is collapsed or opened
 * panelVisible: boolean to determine if the panel should be open or not
 * size: number? representing the pixel width of the panel
 */

const ProfilePanel = props => {
  const {
    panelStyle,
    panelVisible,
    size,
    handleOnSizeChange,
    handleOnVisibleChange,
    photoURL,
    displayName,
  } = props;
  return (
    <div style={panelStyle}>
      <Dock
        position="left"
        isVisible={panelVisible}
        size={size}
        dimMode="transparent"
        onSizeChange={newSize => {
          if (newSize < 0.3)
            //limiting the max size of the panel to 30% of the screen
            handleOnSizeChange(newSize);
        }}
        onVisibleChange={handleOnVisibleChange}
        dockStyle={panelStyle}
      >
        <div className="panel">
          <div className="panel-collapse-button">
            <div />
            <div onClick={handleOnVisibleChange}>&larr;</div>{" "}
            {/*character is leftward facing arrow*/}
          </div>
          <div className="panel-content">
            <img
              className="panel-image"
              src={photoURL ? photoURL + "?height=800" : defaultPic}
              alt="Your profile"
            />{" "}
            {/*if there's a photourl, use it, otherwise use the default image (the ?height=500 to make sure the picture sent is resized to 500px tall*/}
            <div className="panel-name">{displayName || "Joe Bruin"}</div>{" "}
            {/*if there's no displayName, use the default name "Joe Bruin"*/}
            <div className="panel-options">
              <ul className="panel-options-list">
                <li className="panel-options-item">Profile</li>{" "}
                {/** @todo relocate to Profile page*/}
                <li className="panel-options-item">Sketches</li>{" "}
                {/** @todo relocate to sketches page*/}
                <li className="panel-options-item" onClick={() => firebase.auth().signOut()}>
                  Sign Out
                </li>
              </ul>
            </div>
          </div>
          <div className="editor-footer">
            <img className="editor-footer-image" src="img/tla-footer.png" alt="footer" />
          </div>
        </div>
      </Dock>
    </div>
  );
};

export default ProfilePanel;
