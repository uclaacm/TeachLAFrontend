import Immutable from 'immutable';
import { connect } from 'react-redux';
import TextEditor from '../components/TextEditor';
import { setProgramCode, setProgramDirty, addProgram } from '../../../actions/programsActions.js';

import { setMostRecentProgram } from '../../../actions/userDataActions.js';
import { getLanguageData } from '../../../util/languages/languages.js';

const mapStateToProps = (state, ownProps) => {
  const { uid, mostRecentProgram } = state.userData;

  // program data should be an object representing the most recent program
  // should have 2 keys, code (which is the code) and langauge (which is the language the code is written it)
  // add key dirty
  const programData = state.programs.get(mostRecentProgram, Immutable.Map()).toJS();
  return {
    ...programData,
    language: getLanguageData(programData.language),
    mostRecentProgram,
    theme: ownProps.theme,
    uid,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  setProgramCode: (program, code) => {
    dispatch(setProgramCode(program, code));
  },
  dirtyCode: (program) => {
    dispatch(setProgramDirty(program, true));
  },
  addProgram: (program, data) => dispatch(addProgram(program, data)),
  setMostRecentProgram: (value) => dispatch(setMostRecentProgram(value)),
});

const TextEditorContainer = connect(mapStateToProps, mapDispatchToProps)(TextEditor);

export default TextEditorContainer;
