import React from "react";
import EditorContainer from "./Editor/containers/EditorContainer";
import SketchesPageContainer from "./Sketches/containers/SketchesContainer";
import "styles/Main.scss";
import ProfilePanelContainer from "./common/containers/ProfilePanelContainer";

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: false,
    };
  }
  onThemeChange = () => {
    this.setState({ theme: !this.state.theme });
    console.log(this.state.theme);
  };

  renderSketchesPage = () => <SketchesPageContainer />;

  renderEditor = () => <EditorContainer theme={this.state.theme} />;

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
      <div className="main">
        <ProfilePanelContainer
          contentType={this.props.contentType}
          theme={this.state.theme}
          onThemeChange={this.onThemeChange}
        />
        {this.renderContent()}
      </div>
    );
  }
}

export default Editor;
