import { connect } from 'react-redux';
import { deleteProgram } from '../../../reducers/programsReducer'
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';

const mapStateToProps = (state) => ({ uid: state.userData.uid });

const mapDispatchToProps = (dispatch) => ({
  deleteProgram: (program, data) => dispatch(deleteProgram(program, data)),
});

const ConfirmDeleteModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConfirmDeleteModal);

export default ConfirmDeleteModalContainer;
