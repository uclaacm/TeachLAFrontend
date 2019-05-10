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
    addProgram: (program, data) => dispatch(addProgram(program, data)),
  };
};

const EditSketchModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditSketchModal);

export default EditSketchModalContainer;
