import React from "react";
import EditorContainer from "./Editor/containers/EditorContainer";
import SketchesPageContainer from "./Sketches/containers/SketchesContainer";
import { Motion, spring } from "react-motion";
// Specify imports for codemirror usage
import "../styles/Panel.css";
import ProfilePanelContainer from "./common/containers/ProfilePanelContainer";
import { PANEL_SIZE, CLOSED_PANEL_LEFT, OPEN_PANEL_LEFT } from "../constants";

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
      panelLeft: CLOSED_PANEL_LEFT,
      textEditorSize: this.props.screenWidth * 0.5,
    };

    this.panelStartedOpen = this.props.panelOpen;
  }

  //==============React Lifecycle Functions===================//
  componentDidMount() {}

  componentDidUpdate(prevProps) {
    console.log(this.props);

    if (this.props.screenWidth !== prevProps.screenWidth) {
      this.setState({ textEditorSize: this.props.screenWidth * 0.5 });
    }
  }

  componentWillUnmount() {}

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

  renderSketchesPage = value => (
    <SketchesPageContainer
      codeStyle={{
        left: value.panelLeft + PANEL_SIZE,
        width: this.props.screenWidth - (value.panelLeft + PANEL_SIZE),
        position: "fixed",
        height: this.props.screenHeight,
      }}
    />
  );

  renderEditor = value => (
    <EditorContainer
      codeStyle={{
        left: value.panelLeft + PANEL_SIZE,
        width: this.props.screenWidth - (value.panelLeft + PANEL_SIZE),
        position: "fixed",
        height: this.props.screenHeight,
      }}
    />
  );

  renderContent = value => {
    switch (this.props.contentType) {
      case "sketches":
        return this.renderSketchesPage(value);
      case "editor":
      default:
        return this.renderEditor(value);
    }
  };

  render() {
    const { textEditorSize } = this.state;

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
            panelLeft: this.panelStartedOpen ? OPEN_PANEL_LEFT : CLOSED_PANEL_LEFT,
          }}
          style={{
            panelLeft: spring(this.props.panelLeft),
            damping: 30,
            stiffness: 218,
          }}
        >
          {value => {
            return (
              <React.Fragment>
                <ProfilePanelContainer
                  panelStyle={Object.assign({}, panelStyle, { left: value.panelLeft })}
                />
                {this.renderContent(value)}
              </React.Fragment>
            );
          }}
        </Motion>
      </div>
    );
  }
}

export default Editor;
