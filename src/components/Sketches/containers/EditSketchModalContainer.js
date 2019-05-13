import EditSketchModal from "../components/EditSketchModal.js";
import { connect } from "react-redux";
import { setProgramLanguage } from "../../../actions/programsActions";
import { setProgramThumbnail } from "../../../actions/programsActions";

const mapStateToProps = state => {
  return {
    uid: state.userData.uid,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setProgramLanguage: (program, value) => dispatch(setProgramLanguage(program, value)),
    setProgramThumbnail: (program, value) => dispatch(setProgramThumbnail(program, value)),
  };
};

const EditSketchModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditSketchModal);

export default EditSketchModalContainer;
