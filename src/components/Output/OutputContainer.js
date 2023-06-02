import { connect } from 'react-redux';
import { getLanguageData } from '../../util/languages/languages.js';
import Output from './Output.js';

const mapStateToProps = (state, ownProps) => {
  const mostRecentProgram = ownProps.program;
  return {
    mostRecentProgram,
    runResult: state.programs[mostRecentProgram].code,
    language: getLanguageData(state.programs[mostRecentProgram].language),
    screenHeight: state.ui.screenHeight,
    screenWidth: state.ui.screenWidth, // probably will need this
  };
};

const mapDispatchToProps = () => ({
  clearOutput: () => {},
});

const OutputContainer = connect(mapStateToProps, mapDispatchToProps)(Output);

export default OutputContainer;
