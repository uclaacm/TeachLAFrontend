import { connect } from 'react-redux';
import { deleteProgram } from '../../../actions/programsActions';
import { setMostRecentProgram } from '../../../actions/userDataActions';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';

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
