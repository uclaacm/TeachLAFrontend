import React from "react";
import EditorContainer from "./Editor/containers/EditorContainer";
import SketchesPageContainer from "./Sketches/containers/SketchesContainer";
import "styles/Main.scss";
import ProfilePanelContainer from "./common/containers/ProfilePanelContainer";

class Editor extends React.Component {
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
