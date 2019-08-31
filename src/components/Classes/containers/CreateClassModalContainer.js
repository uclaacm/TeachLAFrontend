import CreateClassModal from "../components/CreateClassModal.js";
import { connect } from "react-redux";
import { addProgram } from "../../../actions/programsActions";
import { setMostRecentProgram } from "../../../actions/userDataActions.js";

const mapStateToProps = state => {
  return {
    uid: state.userData.uid,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addProgram: (program, data) => dispatch(addProgram(program, data)),
    setMostRecentProgram: value => dispatch(setMostRecentProgram(value)),
  };
};

const CreateClassModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateClassModal);

export default CreateClassModalContainer;
