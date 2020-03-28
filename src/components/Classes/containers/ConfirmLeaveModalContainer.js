import ConfirmLeaveModal from "../components/ConfirmLeaveModal.js";
import { connect } from "react-redux";
import { removeClass } from "../../../actions/classesActions";

const mapStateToProps = state => {
  return {
    uid: state.userData.uid,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeClass: classKey => dispatch(removeClass(classKey)),
  };
};

const ConfirmLeaveModalContainer = connect(mapStateToProps, mapDispatchToProps)(ConfirmLeaveModal);

export default ConfirmLeaveModalContainer;
