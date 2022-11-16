import React from 'react';

import { EDITOR_WIDTH_BREAKPOINT, CODE_AND_OUTPUT, CODE_ONLY } from '../constants';
import * as cookies from '../lib/cookies';
import * as fetch from '../lib/fetch';

import { getLanguageData } from '../util/languages/languages';
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

    const { screenWidth, uid, setTheme } = this.props;

    this.state = {
      viewMode: screenWidth <= EDITOR_WIDTH_BREAKPOINT ? CODE_ONLY : CODE_AND_OUTPUT,
      pane1Style: { transition: 'width .5s ease' },
      sketchName: '',
      language: null,
      thumbnail: '',
      code: '',
      loaded: false,
      notfound: false,
      originalCode: '',
    };
    this.savePrevProgram = uid !== '';
    setTheme(cookies.getThemeFromCookie());
  }

  async componentDidMount() {
    const {
      programid, mostRecentProgram, setProgramCode, setProgramLanguage, runCode,
    } = this.props;

    if (this.savePrevProgram) {
      await this.codeSaverHelper();
    }

    try {
      fetch
        .getSketch(programid)
        .then((res) => {
          if (!res.ok) {
            this.setState({ notfound: true });
            return;
          }
          const sketch = res.json();
          const lang = getLanguageData(sketch.language);
          this.setState({
            sketchName: sketch.name,
            language: lang,
            code: sketch.code,
            thumbnail: sketch.thumbnail,
            loaded: true,
          });
          setProgramCode(mostRecentProgram, sketch.code);
          setProgramLanguage(mostRecentProgram, sketch.language);
          runCode(sketch.code, lang);
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (err) {
      console.error(err);
    }
  }

  componentDidUpdate(prevProps) {
    const { screenWidth } = this.props;
    const { viewMode } = this.state;

    if (screenWidth !== prevProps.screenWidth) {
      if (screenWidth <= EDITOR_WIDTH_BREAKPOINT) {
        if (viewMode === CODE_AND_OUTPUT) {
          this.setState({ viewMode: CODE_ONLY });
        }
      }
    }
  }

  componentWillUnmount() {
    const { mostRecentProgram, setProgramCode } = this.props;
    const { originalCode } = this.state;

    if (this.savePrevProgram) {
      setProgramCode(mostRecentProgram, originalCode);
    }
  }

  codeSaverHelper = () => {
    const { mostRecentProgram } = this.props;

    try {
      fetch
        .getSketch(mostRecentProgram)
        .then((res) => {
          if (!res.ok) {
            this.setState({ notfound: true });
            return;
          }
          this.setState({
            originalCode: res.json().code,
          });
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (err) {
      console.error(err);
    }
  };

  onThemeChange = () => {
    const { theme, setTheme } = this.props;

    const newTheme = theme === 'dark' ? 'light' : 'dark';
    cookies.setThemeCookie(newTheme);
    setTheme(newTheme);
  };

  render() {
    const {
      notfound, loaded, viewMode, pane1Style, language, code, sketchName, thumbnail,
    } = this.state;
    const {
      left,
      screenWidth,
      screenHeight,
      theme,
      contentType,
      panelOpen,
      mostRecentProgram,
      programid,
    } = this.props;

    if (notfound) {
      return <PageNotFound />;
    }
    if (!loaded) {
      return <LoadingPage />;
    }
    const codeStyle = {
      left: left || 0,
      width: screenWidth - (left || 0),
      height: screenHeight,
    };

    return (
      <div className={`main theme-${theme}`}>
        <ProfilePanelContainer
          contentType={contentType}
          theme={theme}
          onThemeChange={this.onThemeChange}
        />
        <div className="editor" style={codeStyle}>
          <EditorAndOutput
            // view mode
            viewMode={viewMode}
            updateViewMode={(_viewMode) => this.setState({ viewMode: _viewMode })}
            // theme
            theme={theme}
            // sizing
            left={left}
            screenWidth={screenWidth}
            screenHeight={screenHeight}
            // view only trigger
            viewOnly
            // pane
            panelOpen={panelOpen}
            pane1Style={pane1Style}
            changePane1Style={(newStyle) => this.setState(newStyle)}
            // program information
            mostRecentProgram={mostRecentProgram}
            language={language}
            code={code}
            programid={programid}
            sketchName={sketchName}
            thumbnail={thumbnail}
          />
        </div>
      </div>
    );
  }
}

export default ViewOnly;
