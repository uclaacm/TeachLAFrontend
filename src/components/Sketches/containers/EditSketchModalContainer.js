import { connect } from 'react-redux';
import EditSketchModal from '../components/EditSketchModal.js';
import {
  setProgramLanguage,
  setProgramName,
  setProgramThumbnail,
} from '../../../actions/programsActions';

const mapStateToProps = (state) => ({
  uid: state.userData.uid,
});

const mapDispatchToProps = (dispatch) => ({
  setProgramLanguage: (program, value) => dispatch(setProgramLanguage(program, value)),
  setProgramName: (program, value) => dispatch(setProgramName(program, value)),
  setProgramThumbnail: (program, value) => dispatch(setProgramThumbnail(program, value)),
});

const EditSketchModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditSketchModal);

export default EditSketchModalContainer;
