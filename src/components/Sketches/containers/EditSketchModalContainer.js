import { connect } from 'react-redux';
import {
  setProgramLanguage,
  setProgramName,
  setProgramThumbnail,
} from '../../../reducers/programsReducer'
import EditSketchModal from '../components/EditSketchModal.js';

const mapStateToProps = (state) => ({
  uid: state.userData.uid,
});

const mapDispatchToProps = (dispatch) => ({
  setProgramLanguage: (program, language) => dispatch(setProgramLanguage({ program, language })),
  setProgramName: (program, value) => dispatch(setProgramName({ program, name: value })),
  setProgramThumbnail: (program, value) => dispatch(setProgramThumbnail({ program, thumbnail: value })),
});

const EditSketchModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditSketchModal);

export default EditSketchModalContainer;
