import Immutable from "immutable";
import TextEditor from "../components/TextEditor";
import { connect } from "react-redux";
import { setProgramCode, setProgramDirty } from "../../../actions/programsActions.js";
import { addProgram } from "../../../actions/programsActions";
import { setMostRecentProgram } from "../../../actions/userDataActions.js";
import { getLanguageData } from "../../../util/languages/languages.js";

const mapStateToProps = (state, ownProps) => {
  const { uid, mostRecentProgram } = state.userData;

  //program data should be an object representing the most recent program
  //should have 2 keys, code (which is the code) and langauge (which is the language the code is written it)
  // add key dirty
  const programData = state.programs.get(mostRecentProgram, Immutable.Map()).toJS();
  return {
    ...programData,
    language: getLanguageData(programData.language),
    comments: [
      {
        startLineNumber: 1,
        startColumn: 1,
        endLineNumber: 1,
        endColumn: 5,
        message: "Cool message Pog",
      },
    ],
    mostRecentProgram,
    theme: ownProps.theme,
    uid,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setProgramCode: (program, code) => {
      dispatch(setProgramCode(program, code));
    },
    dirtyCode: (program) => {
      dispatch(setProgramDirty(program, true));
    },
    addProgram: (program, data) => dispatch(addProgram(program, data)),
    setMostRecentProgram: (value) => dispatch(setMostRecentProgram(value)),
  };
};

const TextEditorContainer = connect(mapStateToProps, mapDispatchToProps)(TextEditor);

export default TextEditorContainer;
