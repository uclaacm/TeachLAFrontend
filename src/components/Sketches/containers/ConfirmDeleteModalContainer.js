import ConfirmDeleteModal from "../components/ConfirmDeleteModal.js";
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

const ConfirmDeleteModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConfirmDeleteModal);

export default ConfirmDeleteModalContainer;
