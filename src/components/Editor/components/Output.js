import React from "react";
import { PYTHON, JAVASCRIPT, CPP, JAVA, HTML, PROCESSING } from "../../../constants";
import { OUTPUT_ONLY } from "../constants";
import EditorRadio from "./EditorRadio";
import OpenPanelButtonContainer from "../../common/containers/OpenPanelButtonContainer";
import DropdownButtonContainer from "../containers/DropdownButtonContainer";
import CreateProcessingDoc from "./Output/Processing";
import CreatePythonDoc from "./Output/Python";

import { Button } from "reactstrap";

import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faTerminal } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**--------Props--------
 * None
 */

class Output extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //used for the refresh button
      counter: 0,
      run: 0,
      showConsole: true,
    };
    this.firstLoad = true;
  }

  //==============React Lifecycle Functions===================//
  shouldComponentUpdate = (nextProps, nextState) => {
    if (this.state.showConsole !== nextState.showConsole) {
      return true;
    }

    if (this.props.mostRecentProgram !== nextProps.mostRecentProgram) {
      this.firstLoad = true;
      return true;
    }

    if (
      this.state.run !== nextState.run ||
      this.state.counter !== nextState.counter ||
      this.state.showConsole !== nextState.showConsole
    ) {
      this.firstLoad = false;
      return true;
    }
    return false;
  };

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
        id={this.state.counter + " " + this.state.run}
        key={this.state.counter + " " + this.state.run}
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
    let { language, runResult } = this.props;
    const { showConsole } = this.state;

    if (this.firstLoad) {
      return null;
    }

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
        runResult = btoa(runResult);
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

  renderOpenPanelButton = () => this.props.viewMode === OUTPUT_ONLY && <OpenPanelButtonContainer />;

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

  renderConsoleButton = () => (
    <Button
      className="mx-2"
      color={this.state.showConsole ? "danger" : "primary"}
      onClick={this.toggleConsole}
      title={this.state.showConsole ? "Hide Console" : "Show Console"}
      size="lg"
    >
      <FontAwesomeIcon icon={faTerminal} />
    </Button>
  );

  renderBanner = () => (
    <div className="editor-output-banner">
      {this.renderOpenPanelButton()}
      {this.renderLanguageDropdown()}
      <div style={{ flex: "1 1 auto" }}> </div> {/*whitespace*/}
      {this.renderRadio()}
      {this.renderConsoleButton()}
      <Button className="mx-2" color="primary" size="lg" onClick={this.runCode}>
        <FontAwesomeIcon icon={faCheck} />
        &nbsp;&nbsp;Run
      </Button>
    </div>
  );

  runCode = () => {
    this.setState(prevState => ({
      run: prevState.run + 1,
    }));
  };

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
