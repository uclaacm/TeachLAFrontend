import { connect } from 'react-redux';
import { addInstrClass } from '../../../actions/classesActions';
import { setCurrentClass } from '../../../actions/userDataActions';
import CreateClassModal from '../components/CreateClassModal.js';

const mapStateToProps = (state) => ({
  uid: state.userData.uid,
});

const mapDispatchToProps = (dispatch) => ({
  addInstrClass: (cid, data) => dispatch(addInstrClass(cid, data)),
  setCurrentClass: (cid) => dispatch(setCurrentClass(cid)),
});

const CreateClassModalContainer = connect(mapStateToProps, mapDispatchToProps)(CreateClassModal);

export default CreateClassModalContainer;
