import { connect } from 'react-redux';
import { deleteProgram } from '../../../actions/programsActions';
import { setMostRecentProgram, setError } from '../../../actions/userDataActions.js';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal.js';

const mapStateToProps = (state) => {
  const { mostRecentProgram, uid } = state.userData;
  const programKeys = state.programs.keySeq(); // this is an immutable sequence
  return {
    mostRecentProgram,
    programKeys,
    uid,
  };
};

const mapDispatchToProps = (dispatch) => ({
  deleteProgram: (program, data) => dispatch(deleteProgram(program, data)),
  setMostRecentProgram: (value) => dispatch(setMostRecentProgram(value)),
  setUserDataError: (errorMsg) => dispatch(setError(errorMsg)),
});

const ConfirmDeleteModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConfirmDeleteModal);

export default ConfirmDeleteModalContainer;
