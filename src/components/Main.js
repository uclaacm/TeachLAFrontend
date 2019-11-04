import React from "react";
import EditorContainer from "./Editor/containers/EditorContainer";
import SketchesPageContainer from "./Sketches/containers/SketchesContainer";
import "styles/Main.scss";
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
  }

  //==============React Lifecycle Functions===================//
  componentDidMount() {}

  componentDidUpdate(prevProps) {}

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
