import React from "react";
import ProfilePanel from "./Editor/components/ProfilePanel";
import MainContainer from "./Editor/containers/MainContainer";
import { Motion, spring } from "react-motion";
// Specify imports for codemirror usage
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "../styles/CustomCM.css";
import "../styles/Resizer.css";
import "../styles/Editor.css";
import "../styles/Panel.css";

class Editor extends React.Component {
  /**
   * constructor
   *
   * @param {object} props
   *    @key {object} user - information of user; (should never be null bc if someone's not logged in, sends them to the login page)
   *      @key {}
   *    @key {function} clearUserData - redux action to log the user out, brings you to homepage after (bc if you're not logged in, you're rerouted to the home page)
   */
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
      panelVisible: false,
      panelSize: 0,
      textEditorSize: window.innerWidth * 0.5,
      paneStyle: { transition: "none" },
      hotReload: false,
    };
  }

  //==============React Lifecycle Functions===================//
  componentDidMount() {
    window.addEventListener("resize", this.handleResize, true);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize, true);
  }

  handleResize = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
      textEditorSize: window.innerWidth * 0.375,
      panelSize: this.state.panelVisible ? window.innerWidth * 0.25 : 0,
    });
  };

  /**
   *  handleOnVisibleChange - handler for when the collapse panel button or expand panel button is pressed
   *    if the panel is open, closes it and sets the size to 0
   *    if the panel is closed, opens it and sets the size to PROFILE_PANEL_MAX_SIZE
   *
   */
  togglePanel = () => {
    this.setState(prevState => ({
      //open it if its closed, close it if its open
      panelVisible: !prevState.panelVisible,
      //give the profile panel a size of 0 if it was open, PROFILE_PANEL_MAX_SIZE if it was closed
      panelSize: prevState.panelVisible ? 0 : prevState.width * 0.25,
      textEditorSize: prevState.width * 0.375,
      paneStyle: {},
    }));
  };

  splitPaneChangeHandler = textEditorSize => {
    this.setState({ textEditorSize, paneStyle: {} });
  };

  setPaneStyle = newPaneStyle => {
    this.setState({ paneStyle: newPaneStyle });
  };

  render() {
    const { panelVisible, panelSize, textEditorSize, paneStyle, hotReload } = this.state;

    //style to be applied to non panel (sections containing text editor and code output)
    const codeStyle = {
      position: "fixed", //fixed bc we're using left
      height: this.state.height,
      //   //determines how far left of the screen the code should be
      // left: panelSize+268,
      //   //if they're using the slider to change the length of the panel, dont use a transition,
      //   //otherwise (meaning they're using the toggle button) use a transition where when the left changes, it eases out
      //   transition: ""
    };

    const panelStyle = {
      width: panelSize,
      height: this.state.height,
    };

    return (
      <div className="editor">
        <Motion
          defaultStyle={{ x: 0, y: this.state.width }}
          style={{
            x: spring(this.state.panelSize),
            y: spring(this.state.width - panelSize),
            damping: 30,
            stiffness: 218,
          }}
        >
          {value => {
            return (
              <React.Fragment>
                <ProfilePanel
                  handleOnSizeChange={this.onSizeChangeHandler}
                  handleOnVisibleChange={this.togglePanel}
                  panelVisible={panelVisible}
                  size={panelSize}
                  panelStyle={Object.assign({}, panelStyle, { right: value.x })}
                />
                <MainContainer
                  paneStyle={paneStyle}
                  textEditorSize={textEditorSize}
                  onSplitPaneChange={this.splitPaneChangeHandler}
                  handleOnVisibleChange={this.togglePanel}
                  panelVisible={panelVisible}
                  codeStyle={Object.assign({}, codeStyle, { left: value.x, width: value.y })}
                  setPaneStyle={this.setPaneStyle}
                  hotReload={hotReload}
                  width={this.state.width}
                  height={this.state.height}
                />
              </React.Fragment>
            );
          }}
        </Motion>
      </div>
    );
  }
}

export default Editor;
