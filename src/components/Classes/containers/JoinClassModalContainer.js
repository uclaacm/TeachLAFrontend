import JoinClassModal from "../components/JoinClassModal.js";
import { connect } from "react-redux";
import { createClass } from "../../../actions/classesActions";

const mapStateToProps = state => {
  return {
    uid: state.userData.uid,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createClass: (classKey, data) => dispatch(createClass(classKey, data)),
  };
};

const JoinClassModalContainer = connect(mapStateToProps, mapDispatchToProps)(JoinClassModal);

export default JoinClassModalContainer;
