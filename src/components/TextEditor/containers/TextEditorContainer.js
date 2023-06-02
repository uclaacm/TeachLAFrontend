import { connect } from 'react-redux';
import { addProgram, setProgramCode, setProgramDirty } from '../../../reducers/programsReducer'

import { setMostRecentProgram } from '../../../actions/userDataActions.js';
import { getLanguageData } from '../../../util/languages/languages.js';
import TextEditor from '../components/TextEditor';

const mapStateToProps = (state, ownProps) => {
  const { uid } = state.userData;

  // program data should be an object representing the most recent program
  // should have 2 keys, code (which is the code) and langauge (which is the language the code is written it)
  // add key dirty
  const program = ownProps.program;
  const programData = state.programs[program];
  return {
    ...programData,
    language: getLanguageData(programData.language),
    program,
    theme: ownProps.theme,
    uid,
  };
};

const mapDispatchToProps = (dispatch, _ownProps) => ({
  setProgramCode: (program, code) => {
    dispatch(setProgramCode({ program, code }));
  },
  dirtyCode: (program) => {
    console.log('trying to dirty', program);
    dispatch(setProgramDirty({ program, dirty: true }));
  },
  addProgram: (program, data) => dispatch(addProgram({ program, data })),
  setMostRecentProgram: (value) => dispatch(setMostRecentProgram(value)),
});

const TextEditorContainer = connect(mapStateToProps, mapDispatchToProps)(TextEditor);

export default TextEditorContainer;
