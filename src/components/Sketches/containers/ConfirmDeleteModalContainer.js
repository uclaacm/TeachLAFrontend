import { connect } from 'react-redux';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal.js';
import { deleteProgram } from '../../../actions/programsActions';
import { setMostRecentProgram } from '../../../actions/userDataActions.js';

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
});

const ConfirmDeleteModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConfirmDeleteModal);

export default ConfirmDeleteModalContainer;
