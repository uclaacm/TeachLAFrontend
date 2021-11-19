import React from 'react';

import { EDITOR_WIDTH_BREAKPOINT, CODE_AND_OUTPUT, CODE_ONLY } from '../constants';
import * as cookies from '../lib/cookies.js';
import * as fetch from '../lib/fetch.js';

import { getLanguageData } from '../util/languages/languages.js';
import ProfilePanelContainer from './common/containers/ProfilePanelContainer';
import LoadingPage from './common/LoadingPage';
import EditorAndOutput from './EditorAndOutput/EditorAndOutput';
import PageNotFound from './PageNotFound';

import '../styles/Main.scss';

/** ------Props-------
 * togglePanel: function to call when you want the Profile Panel to disappear/reapper
 * panelOpen: boolean telling whether the Profile Panel is open or not
 * left: the left css property that should be applied on the top level element
 */

class ViewOnly extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewMode: this.props.screenWidth <= EDITOR_WIDTH_BREAKPOINT ? CODE_ONLY : CODE_AND_OUTPUT,
      pane1Style: { transition: 'width .5s ease' },
      sketchName: '',
      language: null,
      thumbnail: '',
      code: '',
      loaded: false,
      notfound: false,
      originalCode: '',
    };
    this.savePrevProgram = this.props.uid !== '';
    this.props.setTheme(cookies.getThemeFromCookie());
  }

  componentDidMount = async () => {
    if (this.savePrevProgram) {
      await this.codeSaverHelper();
    }

    const { ok, sketch } = await fetch.getSketch(this.props.programid);

    if (!ok) {
      this.setState({ notfound: true });
      return;
    }
    const lang = getLanguageData(sketch.language);
    this.setState({
      sketchName: sketch.name,
      language: lang,
      code: sketch.code,
      thumbnail: sketch.thumbnail,
      loaded: true,
    });
    this.props.setProgramCode(this.props.mostRecentProgram, sketch.code);
    this.props.setProgramLanguage(this.props.mostRecentProgram, sketch.language);
    this.props.runCode(sketch.code, lang);
  };

  componentDidUpdate(prevProps) {
    if (this.props.screenWidth !== prevProps.screenWidth) {
      if (this.props.screenWidth <= EDITOR_WIDTH_BREAKPOINT) {
        if (this.state.viewMode === CODE_AND_OUTPUT) {
          this.setState({ viewMode: CODE_ONLY });
        }
      }
    }
  }

  componentWillUnmount() {
    if (this.savePrevProgram) {
      this.props.setProgramCode(this.props.mostRecentProgram, this.state.originalCode);
    }
  };

  codeSaverHelper = async () => {
    const { ok: okOriginal, sketch: original } = await fetch.getSketch(
      this.props.mostRecentProgram,
    );

    if (!okOriginal) {
      this.setState({ notfound: true });
      return;
    }

    this.setState({
      originalCode: original.code,
    });
  };

  onThemeChange = () => {
    const newTheme = this.props.theme === 'dark' ? 'light' : 'dark';
    cookies.setThemeCookie(newTheme);
    this.props.setTheme(newTheme);
  };

  render() {
    if (this.state.notfound) {
      return <PageNotFound />;
    }
    if (!this.state.loaded) {
      return <LoadingPage />;
    }
    const codeStyle = {
      left: this.props.left || 0,
      width: this.props.screenWidth - (this.props.left || 0),
      height: this.props.screenHeight,
    };

    return (
      <div className={`main theme-${this.props.theme}`}>
        <ProfilePanelContainer
          contentType={this.props.contentType}
          theme={this.props.theme}
          onThemeChange={this.onThemeChange}
        />
        <div className="editor" style={codeStyle}>
          <EditorAndOutput
            // view mode
            viewMode={this.state.viewMode}
            updateViewMode={(viewMode) => this.setState({ viewMode })}
            // theme
            theme={this.props.theme}
            // sizing
            left={this.props.left}
            screenWidth={this.props.screenWidth}
            screenHeight={this.props.screenHeight}
            // view only trigger
            viewOnly
            // pane
            panelOpen={this.props.panelOpen}
            pane1Style={this.state.pane1Style}
            changePane1Style={(newStyle) => this.setState(newStyle)}
            // program information
            mostRecentProgram={this.props.mostRecentProgram}
            language={this.state.language}
            code={this.state.code}
            programid={this.props.programid}
            sketchName={this.state.sketchName}
            thumbnail={this.state.thumbnail}
          />
        </div>
      </div>
    );
  }
}

export default ViewOnly;
