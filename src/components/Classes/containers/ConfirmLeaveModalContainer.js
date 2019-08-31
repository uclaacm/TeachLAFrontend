import ConfirmLeaveModal from "../components/ConfirmLeaveModal.js";
import { connect } from "react-redux";
import { deleteProgram } from "../../../actions/programsActions";

const mapStateToProps = state => {
  return {
    uid: state.userData.uid,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteProgram: (program, data) => dispatch(deleteProgram(program, data)),
  };
};

const ConfirmLeaveModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConfirmLeaveModal);

export default ConfirmLeaveModalContainer;
