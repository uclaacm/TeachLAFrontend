import { faPlay, faTerminal } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button } from 'reactstrap';
import { OUTPUT_ONLY } from '../../constants';
import OpenPanelButtonContainer from '../common/containers/OpenPanelButtonContainer';
import ViewportAwareButton from '../common/ViewportAwareButton';
import EditorRadio from '../TextEditor/components/EditorRadio';
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

  //= =============React Lifecycle Functions===================//
  shouldComponentUpdate(nextProps, nextState) {
    const { showConsole, run, counter } = this.state;
    const { mostRecentProgram, isSmall } = this.props;
    if (showConsole !== nextState.showConsole) {
      return true;
    }

    if (mostRecentProgram !== nextProps.mostRecentProgram) {
      this.firstLoad = true;
      return true;
    }

    if (isSmall !== nextProps.isSmall) {
      return true;
    }

    if (
      run !== nextState.run
      || counter !== nextState.counter
      || showConsole !== nextState.showConsole
    ) {
      this.firstLoad = false;
      return true;
    }
    return false;
  }

  componentDidUpdate() {
    this.updateOutput();
  }

  updateOutput = () => {
    const {
      viewOnly, vLanguage, language, code, runResult,
    } = this.props;

    const renderLanguage = viewOnly ? vLanguage : language;
    const renderRunResult = viewOnly ? code : runResult;
    const { showConsole } = this.state;

    // if (this.firstLoad) {
    //    return null;
    // }

    // if there's nothing to run, don't render an output
    if (!runResult || !runResult.length) {
      return null;
    }

    const srcDocFunc = () => renderLanguage.render(renderRunResult, showConsole);
    return this.renderIframe(srcDocFunc);
  };

  runCode = () => {
    this.setState((prevState) => ({
      run: prevState.run + 1,
    }));
  };

  renderOutput = () => {
    const {
      viewOnly, vLanguage, language, code, runResult,
    } = this.props;
    const renderLanguage = viewOnly ? vLanguage : language;
    const renderRunResult = viewOnly ? code : runResult;
    const { showConsole } = this.state;

    if (this.firstLoad) {
      return null;
    }

    // if there's nothing to run, don't render an output
    if (!runResult || !runResult.length) {
      return null;
    }

    const srcDocFunc = () => renderLanguage.render(renderRunResult, showConsole);
    return this.renderIframe(srcDocFunc);
  };

  renderOpenPanelButton = () => {
    const { viewMode } = this.props;
    return viewMode === OUTPUT_ONLY && <OpenPanelButtonContainer />;
  };

  renderIframe = (getSrcDoc) => {
    const { counter, run } = this.state;
    const { screenHeight } = this.props;

    // check if getsrcdoc is a function
    if (!getSrcDoc && {}.toString.call(getSrcDoc) === '[object Function]') {
      // console.log('Null src doc function found');
      return null;
    }

    return (
      <iframe
        id={`${counter} ${run}`}
        key={`${counter} ${run}`}
        className="editor-output-iframe"
        style={{ height: `${screenHeight - 61}px` }}
        srcDoc={getSrcDoc()}
        src=""
        title="output-iframe"
        onLoad={() => {}}
      />
    );
  };

  renderRadio = () => {
    const { viewMode, updateViewMode, isSmall } = this.props;
    return (
      viewMode === OUTPUT_ONLY && (
        <div style={{ marginLeft: 'auto' }}>
          <EditorRadio viewMode={viewMode} updateViewMode={updateViewMode} isSmall={isSmall} />
        </div>
      )
    );
  };

  toggleConsole = () => {
    this.setState((prevState) => ({ showConsole: !prevState.showConsole }));
  };

  renderConsoleButton = () => {
    const { showConsole } = this.state;
    return (
      <Button
        className="mx-2"
        color={showConsole ? 'danger' : 'primary'}
        onClick={this.toggleConsole}
        title={showConsole ? 'Hide Console' : 'Show Console'}
        size="lg"
      >
        <FontAwesomeIcon icon={faTerminal} />
      </Button>
    );
  };

  renderBanner = () => {
    const { isSmall } = this.props;
    return (
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
          isSmall={isSmall}
          icon={<FontAwesomeIcon icon={faPlay} />}
          text="Run"
        />
      </div>
    );
  };

  render() {
    const {
      viewOnly, vLanguage, language, screenHeight,
    } = this.props;
    const { counter, run } = this.state;
    const renderLanguage = viewOnly ? vLanguage : language;
    if (renderLanguage.value === 'python') {
      return (
        <div className="editor-output">
          {this.renderBanner()}
          <div
            id={`${counter} ${run}`}
            key={`${counter} ${run}`}
            className="editor-output-iframe"
            style={{ height: `${screenHeight - 61}px` }}
          >
            <textarea id="inner" readOnly />
            <div id="my-canvas" />
          </div>
        </div>
      );
    }
    return (
      <div className="editor-output">
        {this.renderBanner()}
        <div>{this.renderOutput()}</div>
      </div>
    );
  }
}

// {this.renderBanner()}
// <div>{this.renderOutput()}</div>

export default Output;
