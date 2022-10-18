import { connect } from 'react-redux';
import { addProgram } from '../../../actions/programsActions';
import { setMostRecentProgram, setError } from '../../../actions/userDataActions.js';
import CreateSketchModal from '../components/CreateSketchModal.js';

const mapStateToProps = (state) => ({
  uid: state.userData.uid,
});

const mapDispatchToProps = (dispatch) => ({
  addProgram: (program, data) => dispatch(addProgram(program, data)),
  setMostRecentProgram: (value) => dispatch(setMostRecentProgram(value)),
  setUserDataError: (errorMsg) => dispatch(setError(errorMsg)),
});

const CreateSketchModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateSketchModal);

export default CreateSketchModalContainer;
