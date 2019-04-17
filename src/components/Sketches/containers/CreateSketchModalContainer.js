import CreateSketchModal from "../components/CreateSketchModal.js";
import { connect } from "react-redux";
import { addProgram } from "../../../actions/programsActions";

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

const CreateSketchModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateSketchModal);

export default CreateSketchModalContainer;
