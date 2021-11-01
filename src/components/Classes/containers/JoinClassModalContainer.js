import JoinClassModal from "../components/JoinClassModal.js";
import { connect } from "react-redux";
import { addStudentClass } from "../../../actions/classesActions";

const mapStateToProps = (state) => {
  return {
    uid: state.userData.uid,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addStudentClass: (cid, data) => dispatch(addStudentClass(cid, data)),
  };
};

const JoinClassModalContainer = connect(mapStateToProps, mapDispatchToProps)(JoinClassModal);

export default JoinClassModalContainer;
