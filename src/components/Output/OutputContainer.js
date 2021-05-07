import { connect } from 'react-redux';
import { getLanguageData } from '../../util/languages/languages.js';
import Output from './Output.js';

const mapStateToProps = (state) => {
  const { mostRecentProgram } = state.userData;
  return {
    mostRecentProgram,
    runResult: state.programs.getIn([mostRecentProgram, 'code']),
    language: getLanguageData(state.programs.getIn([mostRecentProgram, 'language'])),
    screenHeight: state.ui.screenHeight,
    screenWidth: state.ui.screenWidth, // probably will need this
  };
};

const mapDispatchToProps = () => ({
  clearOutput: () => {},
});

const OutputContainer = connect(mapStateToProps, mapDispatchToProps)(Output);

export default OutputContainer;
