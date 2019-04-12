import React from "react";
import MainContainer from "./Editor/containers/MainContainer";
import { Motion, spring } from "react-motion";
// Specify imports for codemirror usage
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "../styles/CustomCM.css";
import "../styles/Resizer.css";
import "../styles/Editor.css";
import "../styles/Panel.css";
import ProfilePanelContainer from "./Editor/containers/ProfilePanelContainer";

const PANEL_SIZE = 250;
const CLOSED_PANEL_LEFT = -1 * PANEL_SIZE;
const OPEN_PANEL_LEFT = 0;

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
      panelVisible: false,
      panelLeft: CLOSED_PANEL_LEFT,
      textEditorSize: this.props.screenWidth * 0.5,
      hotReload: false,
      changesMade: false,
    };
  }

  //==============React Lifecycle Functions===================//
  componentDidMount() {
    //window.addEventListener('beforeunload', this.promptSave());
  }

  componentDidUpdate(prevProps) {
    if (this.props.screenWidth !== prevProps.screenWidth) {
      this.setState({ textEditorSize: this.props.screenWidth * 0.5 });
    }
  }

  componentWillUnmount() {
    //window.removeEventListener('beforeunload', this.promptSave())
  }

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
      panelLeft: prevState.panelVisible ? CLOSED_PANEL_LEFT : OPEN_PANEL_LEFT,
      //TODO: change textEditorSize here if you wanna fix the open panel causes output to be small bug (need React Motion)
    }));
  };

  splitPaneChangeHandler = textEditorSize => {
    this.setState({ textEditorSize });
  };

  // enableSaveCheck = () => {
  //   this.setState({changesMade: true})
  // }

  // disableSaveCheck = () => {
  //   this.setState({changesMade: false})
  // }

  // promptSave = () => {
  //   if(this.state.changesMade)
  //     event.returnValue = "Changes have been made to your code. Are you sure you want to exit?"
  // }

  render() {
    const { panelVisible, textEditorSize, hotReload } = this.state;

    //style to be applied to non panel (sections containing text editor and code output)
    const codeStyle = {
      position: "fixed", //fixed bc we're using the css property left to set the left edge of the code section/output container
      height: this.props.screenHeight,
    };

    const panelStyle = {
      width: PANEL_SIZE, //width doesn't change, the 'right' css property just pushes it off the page
      height: this.props.screenHeight,
      position: "absolute",
      display: "flex",
    };

    return (
      <div className="editor">
        <Motion
          defaultStyle={{
            panelLeft: CLOSED_PANEL_LEFT,
          }}
          style={{
            panelLeft: spring(this.state.panelLeft),
            damping: 30,
            stiffness: 218,
          }}
        >
          {value => {
            return (
              <React.Fragment>
                <ProfilePanelContainer
                  handleOnVisibleChange={this.togglePanel}
                  panelVisible={panelVisible}
                  panelStyle={Object.assign({}, panelStyle, { left: value.panelLeft })}
                />
                <MainContainer
                  textEditorSize={textEditorSize}
                  onSplitPaneChange={this.splitPaneChangeHandler}
                  handleOnVisibleChange={this.togglePanel}
                  panelVisible={panelVisible}
                  codeStyle={Object.assign({}, codeStyle, {
                    left: value.panelLeft + PANEL_SIZE,
                    width: this.props.screenWidth - (value.panelLeft + PANEL_SIZE),
                  })}
                  hotReload={hotReload}
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
