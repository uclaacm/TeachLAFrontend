import React from "react";
import Dock from "react-dock";
import defaultPic from "../../../img/defaultProfile.png";

/*
  Props:
    bgColor: string representing the color of the background of the img (can be hex color, rgb(r, g, b, a), or color name)
    textColor: string representing the color of the text in the button (can be hex color, rgb(r, g, b, a), or color name)
    imgSrc: string representing the location of the img used as the icon (can be in the form of URL, path location, or data representing image)
    textPadding: string representing padding to the left of the text, i.e. distance from the img (give px units)
*/

const ProfilePanel = props => {
  const {
    panelStyle,
    panelVisible,
    size,
    handleOnSizeChange,
    handleOnVisibleChange,
    user,
    clearUserData,
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
              src={user.photoURL ? user.photoURL + "?height=800" : defaultPic}
              alt="Your profile"
            />{" "}
            {/*if there's a photourl, use it, otherwise use the default image (the ?height=500 to make sure the picture sent is resized to 500px tall*/}
            <div className="panel-name">{user.displayName || "Joe Bruin"}</div>{" "}
            {/*if there's no displayName, use the default name "Joe Bruin"*/}
            <div className="panel-options">
              <ul className="panel-options-list">
                <li className="panel-options-item">Profile</li>{" "}
                {/** @todo relocate to Profile page*/}
                <li className="panel-options-item">Sketches</li>{" "}
                {/** @todo relocate to sketches page*/}
                <li className="panel-options-item" onClick={clearUserData}>
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
