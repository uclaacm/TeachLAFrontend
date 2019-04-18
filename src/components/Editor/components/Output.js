import React from "react";
import { PYTHON, JAVASCRIPT, CPP, JAVA, HTML, PROCESSING } from "../../../constants";
import { OUTPUT_ONLY } from "../constants";
import EditorButton from "./EditorButton";
import EditorRadio from "./EditorRadio";
import DropdownButtonContainer from "../containers/DropdownButtonContainer";
import CreateProcessingDoc from "./Output/Processing";
import CreatePythonDoc from "./Output/Python";

/**--------Props--------
 * None
 */

class Output extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //used for the refresh button
      counter: 0,
      showConsole: true,
    };
  }

  //==============React Lifecycle Functions===================//
  componentDidUpdate = () => {};

  // a bit hacky, but we're re-rendering the output
  // by updating the state in a novel way
  reRenderOutput = () => {
    this.setState(prevState => ({
      counter: prevState.counter + 1,
    }));
  };

  renderIframe = getSrcDoc => {
    //check if getsrcdoc is a function
    if (!getSrcDoc && {}.toString.call(getSrcDoc) === "[object Function]") {
      console.log("Null src doc function found");
      return null;
    }

    return (
      <iframe
        id={this.state.counter}
        key={this.state.counter}
        className="editor-output-iframe"
        style={{ height: this.props.screenHeight - 61 + "px" }}
        srcDoc={getSrcDoc()}
        src=""
        title="output-iframe"
        onLoad={e => {
          // console.log(e);
        }}
      />
    );
  };

  renderOutput = () => {
    const { language, runResult } = this.props;
    const { showConsole } = this.state;

    //if there's nothing to run, don't render an output
    if (!runResult || !runResult.length) {
      return null;
    }

    let srcDocFunc = () => runResult;

    switch (language) {
      case PROCESSING:
        srcDocFunc = () => CreateProcessingDoc(runResult, showConsole);
        break;
      case PYTHON:
        srcDocFunc = () => CreatePythonDoc(runResult, showConsole);
        break;
      case JAVA:
      case JAVASCRIPT:
      case CPP:
      case HTML:
      default:
        break;
    }

    return this.renderIframe(srcDocFunc);
  };

  renderLanguageDropdown = () => this.props.viewMode === OUTPUT_ONLY && <DropdownButtonContainer />;

  renderRadio = () =>
    this.props.viewMode === OUTPUT_ONLY && (
      <div style={{ marginLeft: "auto" }}>
        <EditorRadio
          viewMode={this.props.viewMode}
          updateViewMode={this.props.updateViewMode}
          isSmall={this.props.isSmall}
        />
      </div>
    );

  toggleConsole = () => {
    this.setState(prevState => {
      return { showConsole: !prevState.showConsole };
    });
  };

  getConsoleButtonContent = () => <img alt="console-icon" width="38" src="img/console-icon.png" />;

  renderConsoleButton = () => (
    <EditorButton
      handleClick={this.toggleConsole}
      text={this.getConsoleButtonContent()}
      color={this.state.showConsole ? "#D6A2AD" : "#8EB8E5"}
      width="50px"
      title={this.state.showConsole ? "Hide Console" : "Show Console"}
    />
  );

  renderBanner = () => (
    <div className="editor-output-banner">
      <div style={{ marginLeft: "10px" }}>{this.renderLanguageDropdown()}</div>
      <div style={{ flex: "1 1 auto" }}> </div> {/*whitespace*/}
      {this.renderRadio()}
      {this.renderConsoleButton()}
      <EditorButton handleClick={this.reRenderOutput} text="Refresh" color="#3c52ba" />
    </div>
  );

  render() {
    return (
      <div className="editor-output">
        {this.renderBanner()}
        <div>{this.renderOutput()}</div>
      </div>
    );
  }
}

export default Output;
