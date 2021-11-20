import { connect } from 'react-redux';
import { addStudentClass } from '../../../actions/classesActions';
import JoinClassModal from '../components/JoinClassModal.js';

const mapStateToProps = (state) => ({
  uid: state.userData.uid,
});

const mapDispatchToProps = (dispatch) => ({
  addStudentClass: (cid, data) => dispatch(addStudentClass(cid, data)),
});

const JoinClassModalContainer = connect(mapStateToProps, mapDispatchToProps)(JoinClassModal);

export default JoinClassModalContainer;
