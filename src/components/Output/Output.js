import { faPlay, faTerminal } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button } from 'reactstrap';
import { OUTPUT_ONLY } from '../../constants';
import OpenPanelButtonContainer from '../common/containers/OpenPanelButtonContainer.js';
import ViewportAwareButton from '../common/ViewportAwareButton.js';
import EditorRadio from '../TextEditor/components/EditorRadio.js';
import '../../styles/Output.scss';

/** --------Props--------
 * None
 */

class Output extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // used for the refresh button
      counter: 0,
      run: 0,
      showConsole: true,
    };
    this.firstLoad = true;
  }

  runCode = () => {
    this.setState((prevState) => ({
      run: prevState.run + 1,
    }));
  };

  updateOutput = () => {
    const language = this.props.viewOnly ? this.props.vLanguage : this.props.language;
    const runResult = this.props.viewOnly ? this.props.code : this.props.runResult;
    const { showConsole } = this.state;

    // if (this.firstLoad) {
    //    return null;
    // }

    // if there's nothing to run, don't render an output
    if (!runResult || !runResult.length) {
      return null;
    }

    language.render(runResult, showConsole);

    // const srcDocFunc = () => language.render(runResult, showConsole);
    // return this.renderIframe(srcDocFunc);
  }

  //= =============React Lifecycle Functions===================//
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.showConsole !== nextState.showConsole) {
      return true;
    }

    if (this.props.mostRecentProgram !== nextProps.mostRecentProgram) {
      this.firstLoad = true;
      return true;
    }

    if (this.props.isSmall !== nextProps.isSmall) {
      return true;
    }

    if (
      this.state.run !== nextState.run
      || this.state.counter !== nextState.counter
      || this.state.showConsole !== nextState.showConsole
    ) {
      this.firstLoad = false;
      return true;
    }
    return false;
  };
  
  componentDidUpdate = () => {
    this.updateOutput();
  }

  componentDidMount = function () {
    this.updateOutput();
  };

  renderOpenPanelButton = () => this.props.viewMode === OUTPUT_ONLY && <OpenPanelButtonContainer />;

  renderIframe = (getSrcDoc) => {
    // check if getsrcdoc is a function
    if (!getSrcDoc && {}.toString.call(getSrcDoc) === '[object Function]') {
      console.log('Null src doc function found');
      return null;
    }

    // return (
      // <iframe
      //   id={`${this.state.counter} ${this.state.run}`}
      //   key={`${this.state.counter} ${this.state.run}`}
      //   className="editor-output-iframe"
      //   style={{ height: `${this.props.screenHeight - 61}px` }}
      //   srcDoc={getSrcDoc()}
      //   src=""
      //   title="output-iframe"
      //   onLoad={() => {}}
      // />
    // );
  };

  renderOutput = () => {
  };

  renderRadio = () => this.props.viewMode === OUTPUT_ONLY && (
    <div style={{ marginLeft: 'auto' }}>
      <EditorRadio
        viewMode={this.props.viewMode}
        updateViewMode={this.props.updateViewMode}
        isSmall={this.props.isSmall}
      />
    </div>
  );

  toggleConsole = () => {
    this.setState((prevState) => ({ showConsole: !prevState.showConsole }));
  };

  renderConsoleButton = () => (
    <Button
      className="mx-2"
      color={this.state.showConsole ? 'danger' : 'primary'}
      onClick={this.toggleConsole}
      title={this.state.showConsole ? 'Hide Console' : 'Show Console'}
      size="lg"
    >
      <FontAwesomeIcon icon={faTerminal} />
    </Button>
  );

  renderBanner = () => (
    <div className="editor-output-banner">
      {this.renderOpenPanelButton()}
      <div style={{ flex: '1 1 auto' }}> </div>
      {' '}
      {/* whitespace */}
      {this.renderRadio()}
      {this.renderConsoleButton()}
      <ViewportAwareButton
        className="mx-2"
        color="primary"
        size="lg"
        onClick={this.runCode}
        isSmall={this.props.isSmall}
        icon={<FontAwesomeIcon icon={faPlay} />}
        text="Run"
      />
    </div>
  );

  render() {
    return (
      <div className="editor-output">
          { this.renderBanner() }
          <div
            id={`${this.state.counter} ${this.state.run}`}
            key={`${this.state.counter} ${this.state.run}`}
            className="editor-output-iframe"
            style={{ height: `${this.props.screenHeight - 61}px` }}
          >
            <div id="output">
              <textarea id="inner" readOnly></textarea>
            </div>
            <canvas id="my-canvas"></canvas>
          </div>
      </div>
    );
  }
}

// {this.renderBanner()}
// <div>{this.renderOutput()}</div>

export default Output;
