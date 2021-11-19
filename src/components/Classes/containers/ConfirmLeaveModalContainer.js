import { connect } from 'react-redux';
import { removeStudentClass } from '../../../actions/classesActions';
import { setCurrentClass } from '../../../actions/userDataActions.js';
import ConfirmLeaveModal from '../components/ConfirmLeaveModal.js';

const mapStateToProps = (state) => ({
  uid: state.userData.uid,
});

const mapDispatchToProps = (dispatch) => ({
  removeStudentClass: (cid) => dispatch(removeStudentClass(cid)),
  unsetClass: () => dispatch(setCurrentClass('')),
});

const ConfirmLeaveModalContainer = connect(mapStateToProps, mapDispatchToProps)(ConfirmLeaveModal);

export default ConfirmLeaveModalContainer;
