import Immutable from "immutable";
import TextEditor from "../components/TextEditor";
import { connect } from "react-redux";
import { setProgramCode, setProgramDirty } from "../../../actions/programsActions.js";

const mapStateToProps = state => {
  const { uid, mostRecentProgram } = state.userData;

  //program data should be an object representing the most recent program
  //should have 2 keys, code (which is the code) and langauge (which is the language the code is written it)
  // add key dirty
  const programData = state.programs.get(mostRecentProgram, Immutable.Map()).toJS();

  return {
    ...programData,
    mostRecentProgram,
    uid,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setProgramCode: (program, code) => {
      dispatch(setProgramCode(program, code));
    },
    dirtyCode: program => {
      dispatch(setProgramDirty(program, true));
    },
  };
};

const TextEditorContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TextEditor);

export default TextEditorContainer;
