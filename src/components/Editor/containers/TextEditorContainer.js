import Immutable from "immutable";
import TextEditor from "../components/TextEditor";
import { connect } from "react-redux";
import { setProgramCode } from "../../../actions/programsActions.js";
import { setProgramDirty } from "../../../actions/userDataActions";

const mapStateToProps = state => {
  const { uid, mostRecentProgram, dirty } = state.userData;

  //program data should be an object representing the most recent program
  //should have 2 keys, code (which is the code) and langauge (which is the language the code is written it)
  const programData = state.programs.get(mostRecentProgram, Immutable.Map()).toJS();

  return {
    ...programData,
    mostRecentProgram,
    uid,
    dirty,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setProgramCode: (program, code) => {
      dispatch(setProgramCode(program, code));
    },
    dirtyCode: () => {
      dispatch(setProgramDirty(true));
    },
  };
};

const TextEditorContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TextEditor);

export default TextEditorContainer;
