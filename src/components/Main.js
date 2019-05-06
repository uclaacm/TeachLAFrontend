import React from "react";
import EditorContainer from "./Editor/containers/EditorContainer";
import SketchesPageContainer from "./Sketches/containers/SketchesContainer";
// Specify imports for codemirror usage
import "../styles/Main.css";
import ProfilePanelContainer from "./common/containers/ProfilePanelContainer";

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
      textEditorSize: this.props.screenWidth * 0.5,
    };
  }

  //==============React Lifecycle Functions===================//
  componentDidMount() {}

  componentDidUpdate(prevProps) {
    if (this.props.screenWidth !== prevProps.screenWidth) {
      this.setState({ textEditorSize: this.props.screenWidth * 0.5 });
    }
  }

  componentWillUnmount() {}

  renderSketchesPage = () => <SketchesPageContainer />;

  renderEditor = () => <EditorContainer />;

  renderContent = () => {
    switch (this.props.contentType) {
      case "sketches":
        return this.renderSketchesPage();
      case "editor":
      default:
        return this.renderEditor();
    }
  };

  render() {
    return (
      <div
        className="main"
        style={{ width: this.props.screenWidth, height: this.props.screenHeight }}
      >
        <React.Fragment>
          <ProfilePanelContainer contentType={this.props.contentType} />
          {this.renderContent()}
        </React.Fragment>
      </div>
    );
  }
}

export default Editor;
