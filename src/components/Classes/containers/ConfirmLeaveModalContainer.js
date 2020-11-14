import ConfirmLeaveModal from "../components/ConfirmLeaveModal.js";
import { connect } from "react-redux";
import { removeClass } from "../../../actions/classesActions";
import { setCurrentClass } from "../../../actions/userDataActions.js";

const mapStateToProps = (state) => {
  return {
    uid: state.userData.uid,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeClass: (cid) => dispatch(removeClass(cid)),
    unsetClass: () => dispatch(setCurrentClass("")),
  };
};

const ConfirmLeaveModalContainer = connect(mapStateToProps, mapDispatchToProps)(ConfirmLeaveModal);

export default ConfirmLeaveModalContainer;
